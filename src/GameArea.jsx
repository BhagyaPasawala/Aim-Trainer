import React, { useState, useEffect, useRef } from 'react';
import gunshotSound from './assets/Gunshot.mp3';

const GameArea = ({ onHit, difficulty }) => {
  const [target, setTarget] = useState({ x: 0, y: 0 });
  const audioRef = useRef(null);

  const getRandomPosition = () => ({
    x: Math.random() * 90,
    y: Math.random() * 90,
  });

  useEffect(() => {
    setTarget(getRandomPosition());
    audioRef.current = new Audio(gunshotSound);
    audioRef.current.volume = 0.3;
    audioRef.current.load();
  }, [difficulty]);

  const handleTargetClick = () => {
    onHit();
    playShootSound();
    setTarget(getRandomPosition());
  };

  const playShootSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return (
    <div className="game-area">
      <div
        className="target" 
        style={{
          top: `${target.y}%`,
          left: `${target.x}%`,
          transform: 'translate(-50%, -50%)', 
          position: 'absolute', 
          width: '50px', 
          height: '50px',
          backgroundColor: 'blue',
          borderRadius: '50%', 
        }}
        onClick={handleTargetClick}
      />
    </div>
  );
};

export default GameArea;
