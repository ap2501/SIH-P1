import React, { useState, useEffect } from 'react';
import './Typewriter.css'; // Same as before

const Typewriter = ({ words, typingSpeed = 100, delayBetweenWords = 2000 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeedState, setTypingSpeedState] = useState(typingSpeed);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[currentWordIndex];

      if (isDeleting) {
        setDisplayedText((prev) => currentWord.substring(0, prev.length - 1));
        setTypingSpeedState(typingSpeed / 2); // Speed up when deleting
      } else {
        setDisplayedText((prev) => currentWord.substring(0, prev.length + 1));
      }

      if (!isDeleting && displayedText === currentWord) {
        setTimeout(() => setIsDeleting(true), delayBetweenWords); // Pause before deleting
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length); // Move to the next word
      }
    };

    const typingTimeout = setTimeout(handleTyping, typingSpeedState);

    return () => clearTimeout(typingTimeout); // Cleanup timeout
  }, [displayedText, isDeleting, words, currentWordIndex, typingSpeed, delayBetweenWords, typingSpeedState]);

  return (
    <span className="typewriter">
      {displayedText}
    </span>
  );
};

export default Typewriter;
