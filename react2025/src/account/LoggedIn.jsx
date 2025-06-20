import React, { useEffect, useState } from 'react';
import authService from '../appwrite/auth';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
function LoggedIN() {
  const dispatch = useDispatch();
   useEffect(() => {
    authService.getCurrentUser()
      .then(user => {
        if (user) {
          dispatch(login(user));
        } else {
          dispatch(logoutUser());
        }
      })
      .catch(() => dispatch(logoutUser()));
  }, []);

  const isLoggedIn = useSelector((state) => state.auth.status);

  return (
    <>{ 
        isLoggedIn ?
        <div> <h1> pehle se login</h1> </div> :
        <h1> not logged in </h1>
    }
    </>
  );
}


export default LoggedIN;