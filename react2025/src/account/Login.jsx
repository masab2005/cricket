import React from 'react';
import { login as authLogin } from '../store/authSlice'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import authService from '../appwrite/auth' 
import { useDispatch } from 'react-redux';
import service from '../appwrite/conf.js';
import { updateUserData } from '../store/authSlice.js';
import LoadingSpinner from '../LoadingSpinner.jsx';

function Login(){

  const { 
    register, 
    handleSubmit, 
    formState: { errors }
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  // Get the intended destination from location state, or default to '/game'
  const from = location.state?.from || '/game';

  const getErrorMessage = (error) => {
    const errorMessage = error?.message || "An unexpected error occurred. Please try again.";
    
    if (errorMessage.includes("Invalid credentials")) {
      return "Email or password is incorrect. Please try again.";
    }
    
    if (errorMessage.includes("User not found")) {
      return "No account found with this email. Please sign up first.";
    }
    
    if (errorMessage.includes("Rate limit")) {
      return "Too many login attempts. Please try again later.";
    }
    
    return errorMessage;
  };

  const login = async (data) =>{
    setError("");
    setLoading(true);
    try{
        await authService.logout();
        const { email, password } = data;
        const session = await authService.login(email, password);

        if(session){
          const userData = await authService.getCurrentUser();
          if(userData){ 
               dispatch(authLogin({ userData : userData }));
               const gameData =  await service.getUserInfo(userData.$id);
               dispatch(updateUserData({ userGameData : gameData }));
               navigate(from); 
          }
        }
    } catch(error){
      console.error("Login error:", error);
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }  
  if(loading) return <LoadingSpinner/>
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <svg xmlns="" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0012 0c0-.35-.035-.691-.1-1.02A5 5 0 0010 11z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-white">
          Sign in to your account
        </h2>
      </div>
        
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-700">
          {error && (
            <div className="mb-4 bg-red-900/50 border-l-4 border-red-500 p-4 rounded-r-md">
              <p className="text-red-400">{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit(login)}>

            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="user@example.com"
                  className={`appearance-none block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-600'} bg-gray-700 rounded-md placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  {...register('email', { 
                    required: "Email is required",
                    validate: {
                      matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address"
                    } 
                  })}
                />
                {errors.email && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                )}
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>
            
            <div className="mt-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="password"
                  name="password"
                  type="password"
                  className={`appearance-none block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-600'} bg-gray-700 rounded-md placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  {...register('password', { 
                    required: "Password is required" 
                  })}
                />
                {errors.password && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                )}
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>
              )}
            </div>
            
            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </span>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-400 hover:text-blue-300">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
