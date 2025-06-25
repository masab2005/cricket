import React from 'react';
import authService from '../appwrite/auth';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

function LogOutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.logout();
    dispatch(logout());
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full py-3 px-6 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg shadow-lg flex items-center justify-center gap-2 transition-colors"
    >
      Logout
    </button>
  );
}

export default LogOutBtn;
