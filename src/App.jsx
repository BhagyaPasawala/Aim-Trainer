import React, { useState, useEffect } from 'react';
import GameArea from './GameArea'; 
import './App.css'; 

const App = () => {
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false); 
  const [hasPlayed, setHasPlayed] = useState(false);

  const handleHit = () => {
    setScore(score + 1);
  };

  const handleStart = () => {
    setGameStarted(true);
    setGameOver(false);
    setHasPlayed(true); 
    setScore(0); 
    setTimer(30); 
  };

  useEffect(() => {
    let interval = null;
    if (gameStarted && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setGameStarted(false);
      setGameOver(true); 
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [gameStarted, timer]);

  return (
    <div className="app">
      {!gameStarted && !gameOver ? (
        <div className="start-screen">
          <h1>Aim Trainer</h1>
          <button onClick={handleStart} className="start-button">Start Game</button>
        </div>
      ) : gameOver ? (
        <div className="end-screen">
          <h1>Aim Trainer</h1>
          {hasPlayed && (
            <p>
              Your Score: <span>{score}</span>  {score < 30 ? '| You suck lol.' : '| My owner is still better.'}
            </p>
          )}
          <button onClick={handleStart} className="start-button">Play</button>
        </div>
      ) : (
        <>
          <div className="game-header">
            <p>Score: {score}</p>
            <p>Time Left: {timer}s</p>
          </div>
          <GameArea onHit={handleHit} />
        </>
      )}
    </div>
  );
};

export default App;
