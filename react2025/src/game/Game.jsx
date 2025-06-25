import React, { useEffect, useState } from 'react';
import service from '../appwrite/conf.js';
import Result from './Result.jsx';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../LoadingSpinner.jsx';
import Nav from '../navBar/Nav.jsx';
import End from './End.jsx';
import { useNavigate } from 'react-router-dom';
const hintLabels = [
  "Country",
  "Role",
  "Debut Year",
  "Total Matches",
  "Franchise",
  "Born",
  "Retired?"
];



function Game({onNext}) {
  const userGameData = useSelector((state) => state.auth.userGameData);
  const userData = useSelector((state) => state.auth.userData);
  const [correctAnswer,setCorrectAnswer ] = useState("")
  const [revealedHints, setRevealedHints] = useState([]);
  const [guess, setGuess] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [ hintValues,setHintValues ] = useState([])
  const [count,setCount] = useState(6);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const maxScore = 100;
  const scorePerHint = 10;
  const currentScore = maxScore - revealedHints.length * scorePerHint;

useEffect(() => {
  async function fetchPlayer() {
    try {
      setLoading(true);
      console.log("Fetching player data for index:", userGameData?.currentIndex);
      if (userGameData?.currentIndex === undefined) return;
      

      const player = await service.getPlayer(userGameData.currentIndex); 
      if (player) {
        setHintValues(player.hints);
        setCorrectAnswer(player.playerName);
        setImageUrl(service.getFilePreview(player.imageID));
        console.log("Fetched correct answer:", player.playerName);
      } else {
        setLoading(false)
        navigate('/end');
        console.log("Player not found");
      }
    } catch (error) {
      console.error("Error fetching player data:", error);
    } finally{
      setLoading(false);
    }
  }

  if (userGameData && userGameData.currentIndex !== undefined) {
    fetchPlayer();
  }
}, []);

  

  const handleRevealHint = (index) => {
    if (!revealedHints.includes(index)) {
      setRevealedHints([...revealedHints, index]);
    }
  };

  const handleGuessSubmit = (e) => {
  e.preventDefault();

  const normalizedGuess = guess.trim().toLowerCase();
  const normalizedAnswer = correctAnswer.trim().toLowerCase();

  setIsCorrect(normalizedGuess === normalizedAnswer);

  if (guess !== "") setCount(prev => prev - 1);
  setGuess("");
};

  useEffect(() => {
  if (isCorrect !== null) {
    if(isCorrect === true) {
      setIsCorrect(true);
    }
    else{
    const timer = setTimeout(() => {
      setIsCorrect(null);
    }, 3000);

    return () => clearTimeout(timer);
  }
  }
}, [isCorrect]);
  if (loading) return <LoadingSpinner/>
  if (isCorrect === true) {
    return (
      <Result
    isCorrect={true}
    correctAnswer={correctAnswer}
    currentScore={currentScore}
    imageUrl={imageUrl}
    onNext={onNext}
  />
    );
  }
  if (count === 0 && !isCorrect) {
    return (
      <Result
        isCorrect={false}
        correctAnswer={correctAnswer}
        currentScore={0}
        imageUrl={imageUrl}
        onNext={onNext}
      />
    );
  }

  return (
    <>
    <Nav/>
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-6 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header with Score and Attempts */}
        <div className="flex justify-between items-center mb-8">
          <div className="bg-gray-800 border-l-4 border-blue-500 pl-4 pr-6 py-3 rounded-r-lg shadow-lg">
            <p className="text-gray-400 text-xs uppercase tracking-wide">Current Score</p>
            <p className="text-blue-400 text-2xl font-bold">{currentScore}</p>
          </div>
          
          <div className="bg-gray-800 border-r-4 border-yellow-500 pl-6 pr-4 py-3 rounded-l-lg shadow-lg text-right">
            <p className="text-gray-400 text-xs uppercase tracking-wide">Guesses Left</p>
            <p className="text-yellow-400 text-2xl font-bold">{count}</p>
          </div>
        </div>
        
        {/* Main Game Container */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl overflow-hidden">
          {/* Title Bar */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-4 border-b border-gray-700">
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              CRICKET <span className="text-yellow-400">MASTER</span>
            </h1>
            <p className="text-blue-300 text-sm">Guess the player to earn points</p>
          </div>
          
          {/* Hints Section */}
          <div className="p-6 border-b border-gray-700">
            <h2 className="flex items-center text-lg font-bold text-white mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              PLAYER HINTS
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {hintLabels.map((label, index) => (
                <div key={index} className="relative">
                  {!revealedHints.includes(index) ? (
                    <button
                      onClick={() => handleRevealHint(index)}
                      className="w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 border-l-4 border-blue-500 text-left text-white font-medium rounded-r-md shadow-md transition-colors duration-200"
                    >
                      <span className="block">{label}</span>
                      <span className="text-xs block mt-1 text-red-400">-{scorePerHint} pts</span>
                    </button>
                  ) : (
                    <div className="w-full h-full py-3 px-4 bg-gray-700 border-l-4 border-green-500 rounded-r-md shadow-md">
                      <div className="text-xs uppercase tracking-wide text-gray-400 mb-1">{label}</div>
                      <div className="font-semibold text-green-400">{hintValues[index]}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Input Section */}
          <div className="p-6">
            <form onSubmit={handleGuessSubmit}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter player name..."
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-900 border-2 border-gray-700 focus:border-blue-500 text-white rounded-lg focus:outline-none shadow-inner"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-md shadow-md transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
            
            {isCorrect === false && (
              <div className="mt-4 bg-red-900/50 border-l-4 border-red-500 rounded-r-md p-4">
                <p className="text-red-400 font-semibold">Incorrect guess. Try again!</p>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="py-4 px-6 bg-gray-900 border-t border-gray-700 text-center">
            <p className="text-gray-400 text-sm">Each hint reduces your potential score by {scorePerHint} points</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Game;
