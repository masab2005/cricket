import React, { useEffect, useState } from 'react';
import service from '../appwrite/conf';
import { useSelector } from 'react-redux';
import { Trophy, Star } from 'lucide-react';
import Nav from './Nav';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const currentUserId = useSelector((state) => state.auth.userData?.$id);
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await service.getTopUsers();
      const sorted = response.documents.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.currentIndex - b.currentIndex;
    });
        setLeaderboard(sorted);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };
    fetchLeaderboard();
  }, []);

  useEffect( () =>{
    console.log('Leaderboard data:', leaderboard);
  }, [leaderboard]
  )

  const rankColors = ['from-yellow-400 to-yellow-600', 'from-gray-300 to-gray-500', 'from-amber-500 to-orange-600'];
  const medalEmojis = ['🥇', '🥈', '🥉'];

  return (
    <>
    <Nav />
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl p-6 space-y-4">
        <h1 className="text-3xl font-bold text-center text-white">🏆 Leaderboard</h1>
        {leaderboard.map((user, index) => (
          <div
            key={index}
            className={`flex items-center justify-between bg-gradient-to-r ${rankColors[index]} text-white rounded-xl px-4 py-3 shadow-lg`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{medalEmojis[index]}</span>
              <div>
                <p className="font-semibold text-lg">{user.username || `Player ${index + 1}`}
                {user.$id === currentUserId && <span className="text-black"> (You)</span>}
                </p>
                <p className="text-sm text-white/80">Score: {user.score}</p>
              </div>
            </div>
            <Trophy className="w-6 h-6 text-white" />
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default Leaderboard;
