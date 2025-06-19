import React, { useState } from 'react';
import PlayerCard from './player';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white space-y-6">
      <PlayerCard slug="babar-azam" />
      <div className="bg-white p-4 rounded-lg">
        <p className="!text-red-500 text-lg font-semibold">Tailwind is working ✅</p>
      </div>
    </div>
  );
}


export default App;
