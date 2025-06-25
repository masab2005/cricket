import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import authService from '../appwrite/auth';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await authService.logout();
    dispatch(logout());
    navigate('/login');
  };

  // NEW: accepts an array of paths
  const isActive = (paths) =>
  paths.some((p) => location.pathname === p || location.pathname.startsWith(p + '/'));

  const linkClasses = (paths) =>
    `transition font-medium ${
      isActive(paths)
        ? 'text-yellow-400 opacity-100'
        : 'text-white opacity-50 hover:opacity-100 hover:text-yellow-300'
    }`;

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-yellow-400">🏏 Cricket Guess</h1>

        <ul className="hidden md:flex gap-6 items-center">
          <li>
           
            <Link to="/" className={linkClasses(['/', '/game'])}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/leaderboard" className={linkClasses(['/leaderboard'])}>
              Leaderboard
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300 opacity-70 hover:opacity-100 transition"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
