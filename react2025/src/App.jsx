import React, { useState } from 'react';

function App() {
  const [showText, setShowText] = useState(false);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {!showText ? (
        <button onClick={() => setShowText(true)}>Show</button>
      ) : (
        <p>This is the example text!</p>
      )}
    </div>
  );
}

export default App;
