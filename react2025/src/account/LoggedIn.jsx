import React, { useEffect, useState } from 'react';
import authService from '../appwrite/auth';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, updateUserData } from '../store/authSlice';
import service from '../appwrite/conf';
import { useNavigate } from 'react-router-dom';

function LoggedIN() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.status);

  useEffect(() => {
    async function fetchUserAndData() {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          console.log("Dispatching...", user)
          dispatch(login( {userData : user}));
          const gameData = await service.getUserInfo(user.$id);
          dispatch(updateUserData({ userGameData : gameData }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Login check failed:", error);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    }

    fetchUserAndData();
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      if (isLoggedIn) {
        navigate('/game');
      } else {
        navigate('/login');
      }
    }
  }, [isLoggedIn, loading, navigate]);

  return null;
}

export default LoggedIN;
