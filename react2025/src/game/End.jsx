import React from 'react';
import LogOutBtn from '../account/LogOutBtn';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function End() {
  const userGameData = useSelector((state) => state.auth.userGameData);
  const finalScore = userGameData?.score || 0;
  
  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700">
        {/* Trophy Section */}
        <div className="py-8 px-6 text-center border-b border-gray-700">
          
          <h1 className="text-3xl font-extrabold text-white mb-2">
            Game Over!
          </h1>
          <p className="text-gray-300 text-sm mb-6">
            You've reached the end of all available players
          </p>
          
          <div className="bg-gray-700 rounded-lg p-6 mb-6">
            <div className="text-sm text-gray-400 mb-1">Your Final Score</div>
            <div className="text-4xl font-bold text-yellow-400">{finalScore}</div>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-6">
          <p className="text-gray-300 text-center mb-8">
            Check back soon for more players to test your cricket knowledge!
          </p>
          
          <div className="space-y-4">
            <Link 
              to="/leaderboard"
              className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-lg flex items-center justify-center gap-2 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
              View Leaderboard
            </Link>
            
            <LogOutBtn/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default End;
