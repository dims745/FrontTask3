import React from 'react';
import Squares from './components/Squares';

function App() {
  return (
    <div className="App">
      <Squares initialHeight={6} />
      <Squares initialWidth={8} />
      <Squares cellSize={30} />
      <Squares />
    </div>
  );
}

export default App;
