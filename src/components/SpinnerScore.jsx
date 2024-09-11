import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SpinnerScore = ({ score }) => {
  const [currentScore, setCurrentScore] = useState(0);

  // Animate the score incrementally
  useEffect(() => {
    let current = 0;
    const increment = score / 100;
    const interval = setInterval(() => {
      current += increment;
      setCurrentScore(Math.min(Math.round(current), score));
      if (current >= score) {
        clearInterval(interval);
      }
    }, 20); // Speed of animation

    return () => clearInterval(interval);
  }, [score]);

  // Calculate progress based on score
  const calculateStrokeOffset = (score) => {
    const radius = 70; // Radius of the circle
    const circumference = 2 * Math.PI * radius;
    return circumference - (score / 100) * circumference;
  };

  // Define more saturated colors for various score ranges
  const getColor = (currentScore) => {
    if (currentScore < 40) {
      return '#FF3B3B'; // Vibrant Red
    } else if (currentScore < 80) {
      return '#FFC700'; // Vibrant Yellow
    } else {
      return '#00E676'; // Vibrant Green
    }
  };

  return (
    <div className="flex justify-center items-center">
      <svg
        className="relative w-48 h-48" // Increased the size slightly for better readability
        viewBox="0 0 160 160"
      >
        {/* Background circle */}
        <circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          stroke="#e0e0e0"
          strokeWidth="14" // Increased stroke width to make it thicker
        />

        {/* Foreground circle (progress) */}
        <motion.circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          stroke={getColor(currentScore)}
          strokeWidth="14" // Increased stroke width for the progress circle
          strokeDasharray="440" // 2 * PI * radius
          strokeDashoffset={calculateStrokeOffset(currentScore)}
          strokeLinecap="round"
          initial={{ strokeDashoffset: 440 }} // Full circle initially hidden
          animate={{ strokeDashoffset: calculateStrokeOffset(currentScore) }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />

        {/* Score Text */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          fontSize="44" // Increased font size for more visibility
          fontWeight="900" // Made the font bolder
          fill={getColor(currentScore)}
        >
          {currentScore}
        </text>
      </svg>
    </div>
  );
};

export default SpinnerScore;
