import React, { useEffect, useState } from 'react';
import authService from '../appwrite/auth';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, updateUserData } from '../store/authSlice';
import service from '../appwrite/conf';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner';

function LoggedIN() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.status);

  useEffect(() => {
    const checkAuthAndNavigate = async () => {
      setLoading(true);
      
      try {
        const user = await authService.getCurrentUser();
        
        if (user) {
          console.log("Session found. Dispatching login...");
          dispatch(login({ userData: user }));
          
          try {
            const gameData = await service.getUserInfo(user.$id);
            dispatch(updateUserData({ userGameData: gameData }));
          } catch (gameDataError) {
            console.error("Error fetching game data:", gameDataError);
          }
          
          setLoading(false);
          navigate('/game');
        } else {
          // User is not authenticated
          dispatch(logout());
          setLoading(false);
          navigate('/login');
        }
      } catch (error) {
        console.error("Login check failed:", error);
        dispatch(logout());
        setLoading(false);
        navigate('/login');
      }
    };
    checkAuthAndNavigate();
    
  }, [dispatch]);
  
  if (loading) return <LoadingSpinner />;
  
  return null;
}

export default LoggedIN;