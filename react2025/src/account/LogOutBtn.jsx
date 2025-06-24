import React from 'react';
import authService from '../appwrite/auth';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react'; // Optional icon library

function LogOutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    dispatch(logout());
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 
                 hover:from-yellow-500 hover:to-pink-500 transition-all duration-300 ease-in-out rounded-2xl shadow-xl 
                 font-bold text-lg tracking-wider border-2 border-transparent hover:border-white 
                 active:scale-95 hover:rotate-1"
    >
      <LogOut className="w-5 h-5" />
      Logout
    </button>
  );
}

export default LogOutBtn;
