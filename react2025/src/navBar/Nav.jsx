import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import authService from '../appwrite/auth';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { Menu, X, Home, Award, LogOut, User } from 'lucide-react';

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((state) => state.auth.userData);
  const userGameData = useSelector((state) => state.auth.userGameData);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await authService.logout();
    dispatch(logout());
    navigate('/login');
  };

  // Check if a path is active
  const isActive = (paths) =>
    paths.some((p) => location.pathname === p || location.pathname.startsWith(p + '/'));

  // Navigation items
  const navItems = [
    { 
      name: 'Game', 
      path: '/game', 
      icon: <Home className="w-4 h-4" />,
      isActive: isActive(['/', '/game'])
    },
    { 
      name: 'Leaderboard', 
      path: '/leaderboard', 
      icon: <Award className="w-4 h-4" />,
      isActive: isActive(['/leaderboard'])
    }
  ];

  return (
    <nav className="bg-gray-900 border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo and User Info */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="ml-2 font-bold text-lg text-white">
                {userData?.name}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="bg-gray-800 rounded-lg py-1 px-1 flex items-center">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-1 transition-all duration-200 ${
                    item.isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {item.icon}
                  <span className="ml-1">{item.name}</span>
                </Link>
              ))}
              
              {/* User Score */}
              <div className="ml-2 mr-1 px-3 py-1 bg-gray-700 rounded-lg flex items-center">
                <span className="text-yellow-400 font-medium">{userGameData?.score || 0}</span>
                <span className="ml-1 text-xs text-gray-400">pts</span>
              </div>
            </div>
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="ml-4 flex items-center px-3 py-1.5 text-sm bg-red-600 hover:bg-red-500 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-gray-800 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center py-2 px-3 rounded-lg ${
                  item.isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Link>
            ))}
            
            <div className="flex items-center justify-between py-2 px-3">
              <div className="flex items-center">
                <User className="w-4 h-4 text-gray-400" />
                <span className="ml-2 text-gray-300">{userData?.name}</span>
              </div>
              <div className="bg-gray-800 px-2 py-0.5 rounded-md">
                <span className="text-yellow-400 text-sm">{userGameData?.score || 0} pts</span>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center py-2 px-3 mt-2 bg-red-600 hover:bg-red-500 rounded-lg text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
