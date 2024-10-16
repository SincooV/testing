
import React, { useEffect, useState } from 'react';
import './Stars.css';

const Stars = () => {
  const [stars, setStars] = useState([]);
  const [isFalling, setIsFalling] = useState(true); 

  useEffect(() => {
    const createStars = (numStars) => {
      const colors = ['#FFFFFF']; 
      const starsArray = Array.from({ length: numStars }, () => ({
        top: `${Math.random() * 100}vh`,
        left: `${Math.random() * 100}vw`,
        animationDuration: `${Math.random() * 2 + 1}s`,
        velocity: Math.random() * 0.5 + 0.5, 
        color: colors[0], 
      }));
      setStars(starsArray);
    };

    createStars(50); 

    const timer = setTimeout(() => {
      setIsFalling(false); 
      smoothStop(); 
    }, 15000); 

    return () => clearTimeout(timer); 
  }, []);

  const smoothStop = () => {
    const interval = setInterval(() => {
      setStars((prevStars) => {
        return prevStars.map((star) => {
          const newTop = parseFloat(star.top) - star.velocity; 
          return {
            ...star,
            top: `${Math.max(newTop, -5)}vh`,
          };
        });
      });

      if (stars.every((star) => parseFloat(star.top) <= -5)) {
        clearInterval(interval); 
      }
    }, 100);
  };

  const handleMouseMove = (event) => {
    const mousePosition = { x: event.clientX, y: event.clientY };
    const newStars = stars.map((star) => {
      const starRect = {
        x: parseFloat(star.left),
        y: parseFloat(star.top),
      };
      const distance = Math.sqrt(
        Math.pow(starRect.x - mousePosition.x / window.innerWidth * 100, 2) +
        Math.pow(starRect.y - mousePosition.y / window.innerHeight * 100, 2)
      );

      if (distance < 15) {
        const offsetX = (Math.random() - 0.5) * 5; 
        const offsetY = (Math.random() - 0.5) * 5;
        return {
          ...star,
          top: `${Math.min(100, Math.max(0, starRect.y + offsetY))}vh`,
          left: `${Math.min(100, Math.max(0, starRect.x + offsetX))}vw`,
        };
      }
      return star;
    });

    setStars(newStars);
  };

  const handleTouchMove = (event) => {
    event.preventDefault();
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      <div className="background-animations">
        <div className="eclipse" />
        <div className="layers">
          <div className="layer layer1" />
          <div className="layer layer2" />
          <div className="layer layer3" />
        </div>
        <div className="stars">
          {stars.map((star, index) => (
            <div
              key={index}
              className="star"
              style={{
                top: star.top,
                left: star.left,
                backgroundColor: star.color,
                animationDuration: isFalling ? star.animationDuration : '0s', 
                opacity: isFalling ? 1 : 0.5,
                transition: 'top 0.5s ease, left 0.2s ease, opacity 0.5s ease', 
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stars;
