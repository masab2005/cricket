import React, { useState } from 'react';
import PlayerCard from './player';

function App() {
  const [showText, setShowText] = useState(false);

  return (
        <PlayerCard slug="babar-azam" />
  );
}

export default App;
