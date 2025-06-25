import React, { useEffect, useState } from 'react';
import service from '../appwrite/conf';
import { useSelector } from 'react-redux';
import { Trophy, Star, Medal, ArrowLeft } from 'lucide-react';
import Nav from './Nav';
import { Link } from 'react-router-dom';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUserId = useSelector((state) => state.auth.userData?.$id);
  
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await service.getTopUsers();
        const sorted = response.documents.sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          return a.currentIndex - b.currentIndex;
        });
        setLeaderboard(sorted);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  // Trophy icons for top 3 players
  const trophyIcons = [
    <div className="w-12 h-12 flex items-center justify-center bg-yellow-400 rounded-full shadow-lg">
      <Trophy className="w-6 h-6 text-gray-900" />
    </div>,
    <div className="w-12 h-12 flex items-center justify-center bg-gray-300 rounded-full shadow-lg">
      <Trophy className="w-6 h-6 text-gray-700" />
    </div>,
    <div className="w-12 h-12 flex items-center justify-center bg-amber-600 rounded-full shadow-lg">
      <Trophy className="w-6 h-6 text-amber-900" />
    </div>
  ];

  return (
    <>
    <Nav />
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/game" 
          className="inline-flex items-center mb-6 text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Game
        </Link>
        
        {/* Leaderboard Card */}
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700">
          {/* Header */}
          <div className="py-6 px-6 text-center border-b border-gray-700">
            <h1 className="text-3xl font-bold text-white">
              Leaderboard
            </h1>
            <p className="text-gray-400 text-sm mt-1">Top cricket masters</p>
          </div>
          
          {/* Leaderboard List */}
          <div className="px-6 pb-6">
            {loading ? (
              <div className="py-12 text-center text-gray-400">
                <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-700 rounded-full animate-spin mx-auto mb-4"></div>
                <p>Loading leaderboard...</p>
              </div>
            ) : leaderboard.length === 0 ? (
              <div className="py-12 text-center text-gray-400">
                <p>No players on the leaderboard yet</p>
              </div>
            ) : (
              <div className="space-y-4 mt-6">
                {leaderboard.map((user, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 ${
                      user.$id === currentUserId 
                        ? 'bg-blue-900/30 border-l-4 border-blue-500' 
                        : 'bg-gray-700'
                    } rounded-lg transition-all duration-300`}
                  >
                    {/* Rank */}
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold text-gray-300 w-6 text-center">
                        {index + 1}
                      </div>
                      
                      {/* Trophy for top 3 */}
                      {index < 3 && trophyIcons[index]}
                      
                      {/* User Info */}
                      <div>
                        <div className="font-semibold text-lg flex items-center">
                          <span className="text-white">{user.username || `Player ${index + 1}`}</span>
                          {user.$id === currentUserId && (
                            <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">You</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-400">
                          Player Level: {Math.floor(user.score / 100) + 1}
                        </div>
                      </div>
                    </div>
                    
                    {/* Score */}
                    <div className="text-2xl font-bold text-yellow-400">{user.score}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Leaderboard;
