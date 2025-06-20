import React, { useEffect, useState } from 'react';
import LoggedIN from './account/LoggedIn';
import LogOutBtn from './account/LogOutBtn';
import authService from './appwrite/auth';
import Login from './account/Login';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        setUser(userData);
      })
      .catch(() => {
        setUser(null); // not logged in
      });
  }, [user]);

  return (
    <>
      {user ? (
        <>
          <LoggedIN />
          <LogOutBtn />
        </>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
