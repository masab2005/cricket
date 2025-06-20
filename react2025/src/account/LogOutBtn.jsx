import React, { useEffect, useState } from 'react';
import authService from '../appwrite/auth';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../store/authSlice';

function LogOutBtn() {
const dispatch = useDispatch();
  return <button onClick={() => {
                                authService.logout();
                                dispatch(logout())}  }>Logout</button>
}


export default LogOutBtn;