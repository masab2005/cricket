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
      className="text-red-400 hover:text-red-300 font-medium transition duration-200"
    >
      Logout
    </button>
  );
}

export default LogOutBtn;
