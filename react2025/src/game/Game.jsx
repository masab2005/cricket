import React, { useEffect, useState } from 'react';
import service from '../appwrite/conf.js';
import Result from './Result.jsx';
import { useSelector } from 'react-redux';

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
  const [ correctAnswer,setCorrectAnswer ] = useState("")
  const [revealedHints, setRevealedHints] = useState([]);
  const [guess, setGuess] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [ hintValues,setHintValues ] = useState([])
  const [count,setCount] = useState(6);
  const [imageUrl, setImageUrl] = useState("");
  const maxScore = 100;
  const scorePerHint = 10;
  const currentScore = maxScore - revealedHints.length * scorePerHint;

useEffect(() => {
  async function fetchPlayer() {
    try {
      console.log("Fetching player data for index:", userGameData);
      console.log("user data", userData);
      const player = await service.getPlayer(userGameData.currentIndex); 
      if (player) {
        setHintValues(player.hints);
        setCorrectAnswer(player.playerName);
        setImageUrl(service.getFilePreview(player.imageID));
        console.log("Fetched correct answer:", player.playerName);
      } else {
        console.log("Player not found");
      }
    } catch (error) {
      console.error("Error fetching player data:", error);
    }
  }
  fetchPlayer();
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
        currentScore={currentScore}
        imageUrl={imageUrl}
        onNext={onNext}
      />
    );
  }

  return (
    <div className="p-4 max-w-xl mx-auto text-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] min-h-screen text-white rounded-lg shadow-xl border border-blue-900">
  <h1 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-wider text-yellow-400 animate-pulse">🏏 Guess the Cricketer!</h1>
  
  <p className="mb-4 text-lg">
    Score: <span className="font-bold text-green-400">{currentScore}</span>
  </p>

  {/* Hint Buttons or Values */}
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
    {hintLabels.map((label, index) => (
      <div key={index}>
        {!revealedHints.includes(index) ? (
          <button
            onClick={() => handleRevealHint(index)}
            className="w-full py-2 px-3 text-sm bg-blue-700 hover:bg-blue-600 active:scale-95 transition-transform rounded-lg shadow-md hover:shadow-blue-500/50"
          >
            {label}
          </button>
        ) : (
          <div className="w-full py-2 px-3 text-sm bg-green-200 text-black rounded-lg border border-green-500 shadow-inner">
            {hintValues[index]}
          </div>
        )}
      </div>
    ))}
  </div>

  {/* Input + Submit */}
  <form onSubmit={handleGuessSubmit} className="space-y-4">
    <input
      type="text"
      placeholder="e.g: Babar Azam"
      value={guess}
      onChange={(e) => setGuess(e.target.value)}
      className="w-full px-4 py-2 border-2 border-yellow-500 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-gray-400"
    />
    <button
      type="submit"
      className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-600 active:scale-95 transition duration-150 ease-in-out shadow-lg"
    >
      🎯 Submit Guess
    </button>
  </form>

  <p className="mt-4 text-md font-semibold text-yellow-300">
    Guesses Left: <span className="text-white">{count}</span>
  </p>

  {isCorrect === false && (
    <p className="mt-4 text-lg font-semibold text-red-400"> wrong guess ! lmfao </p>)
  } 

  {count === 0 && !isCorrect && (
    <p className="mt-4 text-lg font-semibold text-red-400">
      🛑 Game Over! The correct answer was: <span className="underline text-white">{correctAnswer}</span>
    </p>
  )}
  {
    guess
  }
</div>
  );
}

export default Game;
