import React from 'react';
import { login as authLogin, updateUserData } from '../store/authSlice'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import authService from '../appwrite/auth' 
import conf from '../appwrite/conf';
import { useDispatch } from 'react-redux';
import LoadingSpinner from '../LoadingSpinner.jsx';

function Signup() {
    const { 
      register, 
      handleSubmit, 
      watch, 
      formState: { errors }
    } = useForm();
    
    const navigate = useNavigate();
    const [error, setError] = React.useState("");
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);

    const getErrorMessage = (error) => {
      const errorMessage = error?.message || "An unexpected error occurred";
      
      if (errorMessage.includes("user already exists")) {
        return "An account with this email already exists. Please log in instead.";
      }
      
      if (errorMessage.includes("Invalid email")) {
        return "Please enter a valid email address.";
      }
      
      if (errorMessage.includes("Password must be")) {
        return "Password must be at least 6 characters long and include both letters and numbers.";
      }
      
      return errorMessage;
    };

    const create = async(data) => {
        setError("")
        setLoading(true);
        try {
          const { email, password, name } = data;
          
          const session = await authService.createAccount({ email, password, name });
          if (session) {
            const userData = await authService.getCurrentUser();
            if (userData) {
                dispatch(authLogin({ userData : userData }));
                const gameData = await conf.createUser(userData)
                dispatch(updateUserData({ userGameData : gameData }));
                navigate('/game');
            }
          }
        } catch (error) {
          console.error("Signup error:", error);
          setError(getErrorMessage(error));
        } finally {
          setLoading(false);
        }
    }
    
    if (loading) return <LoadingSpinner/>
    
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
              </svg>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-white">
            Create a new account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-700">
            {error && (
              <div className="mb-4 bg-red-900/50 border-l-4 border-red-500 p-4 rounded-r-md">
                <p className="text-red-400">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit(create)}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="name"
                    name="name" 
                    placeholder="John Doe" 
                    type="text"
                    {...register('name', { 
                      required: "Name is required" 
                    })}
                    className={`appearance-none block w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-600'} bg-gray-700 rounded-md placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm`} 
                  />
                  {errors.name && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  )}
                </div>
                {errors.name && (
                  <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
                )}
              </div>

              <div className="mt-6">
                <label htmlFor="username" className="block text-sm font-medium text-gray-300">Username</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input 
                    id="username" 
                    name="username" 
                    placeholder="john" 
                    type="text" 
                    {...register('username', { 
                      required: "Username is required" 
                    })}
                    className={`appearance-none block w-full px-3 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-600'} bg-gray-700 rounded-md placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm`} 
                  />
                  {errors.username && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  )}
                </div>
                {errors.username && (
                  <p className="mt-1 text-xs text-red-400">{errors.username.message}</p>
                )}
              </div>

              <div className="mt-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="email"
                    name="email" 
                    placeholder="user@example.com" 
                    type="email"
                    className={`appearance-none block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-600'} bg-gray-700 rounded-md placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    {...register('email', {
                      required: "Email is required",
                      validate: {
                        matchPattern: (value) => 
                          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
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
                      required: "Password is required",
                      validate: { 
                        matchPattern: (value) => 
                          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value) || 
                          "Password must be at least 6 characters long and include letters and numbers"
                      }
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
                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-300">
                  Confirm Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input 
                    id="password_confirmation" 
                    name="password_confirmation" 
                    type="password"
                    className={`appearance-none block w-full px-3 py-2 border ${errors.password_confirmation ? 'border-red-500' : 'border-gray-600'} bg-gray-700 rounded-md placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    {...register('password_confirmation', {
                      required: "Please confirm your password",
                      validate: (value) => value === watch('password') || "Passwords do not match"
                    })}
                  />
                  {errors.password_confirmation && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  )}
                </div>
                {errors.password_confirmation && (
                  <p className="mt-1 text-xs text-red-400">{errors.password_confirmation.message}</p>
                )}
              </div>

              <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Creating account..." : "Create account"}
                  </button>
                </span>
              </div>
            </form>
            
            <p className="mt-6 text-center text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-400 hover:text-blue-300">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
}

export default Signup;