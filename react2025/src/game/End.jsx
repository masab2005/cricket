import React from 'react';
import LogOutBtn from '../account/LogOutBtn';
import { Link } from 'react-router-dom';
function End() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-800 flex items-center justify-center px-4">
      <div className="bg-gray-850 p-8 rounded-2xl shadow-xl max-w-lg text-center text-white space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-yellow-400">
          Thank You for Playing
        </h1>
        <p className="text-base md:text-lg text-gray-300">
          You've reached the end of the current player collection.
        </p>
        <p className="text-sm md:text-base text-gray-400">
          We regularly update the game with new players. Please check back later to continue challenging your cricket knowledge.
        </p>
        <LogOutBtn />   
        <br/>
        <Link to='/leaderboard' className="inline-block mt-4 px-6 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-600 transition-colors">
        Leaderboard
        </Link>
      </div>
    </div>
  );
}

export default End;
