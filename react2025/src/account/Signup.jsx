import React from 'react';
import { login as authLogin } from '../store/authSlice'
import { Link,useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import authService from '../appwrite/auth' 
import { useDispatch } from 'react-redux';

function Signup() {
    const { register, handleSubmit, watch } = useForm();
    const navigate = useNavigate();
    const [error, setError] = React.useState("");
    const dispatch = useDispatch();

    const create = async(data) => {
        setError("")
        try{
        const session = await authService.createAccount(data);
        if(session){
            const userData = await authService.getCurrentUser();
            if(userData) {
                dispatch(authLogin({ userData }));
                navigate('/success');
            }
        }
    } catch(error) {
        setError(error.message);
    }
}
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Workflow"/>
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Create a new account
        </h2>
    </div>

    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit(create)}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-5  text-gray-700">Name</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <input id="name" name="name" placeholder="John Doe" type="text" {...register('name', { required: true })}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                        <div className="hidden absolute inset-y-0 right-0 pr-3 items-center pointer-events-none">
                            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd">
                                </path>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <label htmlFor="username" className="block text-sm font-medium leading-5 text-gray-700">Username</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <input id="username" name="username" placeholder="john" type="text" {...register('username', { required: true })}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                    </div>
                </div>

                <div className="mt-6">
                    <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                        Email address
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <input id="email" name="email" placeholder="user@example.com" type="email"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}/>
                        <div className="hidden absolute inset-y-0 right-0 pr-3 items-center pointer-events-none">
                            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"></path>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                        Password
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                        <input id="password" name="password" type="password" required=""
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            {...register('password', {
                                required: true,
                                validate: { 
                                   matchPatern: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value) || "Password must be at least 6 characters long and include letters and numbers",
                                }
                            })}/>                  
                    </div>
                </div>

                <div className="mt-6">
                    <label htmlFor="password_confirmation" className="block text-sm font-medium leading-5 text-gray-700">
                        Confirm Password
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                        <input id="password_confirmation" name="password_confirmation" type="password"
                             {...register('password_confirmation', {
                                 required: true,
                                validate: (value) => value === watch('password') || "Passwords do not match",
                     })}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                    </div>
                </div>

                <div className="mt-6">
                    <span className="block w-full rounded-md shadow-sm">
                        <button type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                            Create account
                        </button>
                    </span>
                </div>
            </form>
            <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-500">
              login
            </Link>
          </p>
        </div>
    </div>
</div>
  )
}

export default Signup