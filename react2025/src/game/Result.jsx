import React, { useEffect } from 'react';
import service from '../appwrite/conf.js';
import { updateUserData } from '../store/authSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import LogOutBtn from '../account/LogOutBtn.jsx';

function Result({ isCorrect, correctAnswer, currentScore, imageUrl, onNext }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const userGameData = useSelector((state) => state.auth.userGameData);

  const currentIndex = (userGameData?.currentIndex || 0) + 1;

  useEffect(() => {
    async function updateUserScoreAndIndex() {
      try {
        const updatedUser = await service.updateUserScore(userData.$id, currentScore, currentIndex);
        dispatch(updateUserData({ userGameData: updatedUser }));
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    }

    // Only update score if the answer was correct
    if (userData?.$id) {
      updateUserScoreAndIndex();
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-slate-800 text-white p-6">
      <div className="bg-slate-900 rounded-2xl shadow-2xl p-6 md:p-10 max-w-lg w-full border border-slate-700 text-center">
        <div className={`text-2xl font-bold mb-6 transition-all duration-500 ${
          isCorrect ? 'text-green-400' : 'text-red-500'
        }`}>
          {isCorrect ? '🏏 You guessed it right!' : 'Wrong guess! Try next player.'}
        </div>

        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Player"
            className="w-48 h-48 object-cover rounded-full mx-auto border-4 border-yellow-500 shadow-lg mb-6"
          />
        ) : (
          <p className="text-sm text-gray-400 mb-6">Loading image...</p>
        )}

        <div className="space-y-4 text-lg">
          <p>
            <span className="text-gray-300">Correct Answer:</span>{' '}
            <span className="text-white font-semibold underline underline-offset-4">
              {correctAnswer}
            </span>
          </p>

          <p>
            <span className="text-gray-300">Your Score:</span>{' '}
            <span className={`font-bold ${isCorrect ? 'text-green-400' : 'text-red-500'}`}>
              {isCorrect ? currentScore : 0}
            </span>
          </p>
        </div>

        <button
          onClick={onNext}
          className="mt-8 px-6 py-3 bg-yellow-400 text-slate-900 font-semibold rounded-full shadow-lg hover:bg-yellow-300 active:scale-95 transition-transform duration-200"
        >
          🔁 Next Player
        </button>
      </div>
      <LogOutBtn/>
    </div>
  );
}

export default Result;
