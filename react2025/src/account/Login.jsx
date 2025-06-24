import React from 'react';
import { login as authLogin } from '../store/authSlice'
import { Link,useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import authService from '../appwrite/auth' 
import { useDispatch } from 'react-redux';
import service from '../appwrite/conf.js';
import { updateUserData } from '../store/authSlice.js';
function Login(){

  const { register, handleSubmit  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = React.useState("");

  const login = async (data) =>{
    setError("");
    try{
        const { email, password } = data;
        const session = await authService.login(email, password);

        if(session){
          const userData = await authService.getCurrentUser();
          if(userData){ 
               dispatch(authLogin({ userData : userData }));
               const gameData =  await service.getUserInfo(userData.$id);
               dispatch(updateUserData({ userGameData : gameData }));
               navigate('/game');
          }
        }
    } catch(error){
      setError(error.message);
    }
  }  

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Login" />
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}  
          <form onSubmit={handleSubmit(login)}>


            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="user@example.com"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  {...register('email', { required: true,validate: {
                              matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                              "Email address must be a valid address",
                    } })}
                />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                Password
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  {...register('password', { required: true})}
                />
              </div>
            </div>

            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700 transition duration-150 ease-in-out"
                >
                  Sign in
                </button>
              </span>
            </div>
          </form>

          <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
