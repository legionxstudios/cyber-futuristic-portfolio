import { useState, useEffect } from 'react';

interface TypeWriterProps {
  texts: string[];
}

export const TypeWriter = ({ texts }: TypeWriterProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleType();
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentIndex]);

  const handleType = () => {
    const i = loopNum % texts.length;
    const fullText = texts[i];

    if (isDeleting) {
      setDisplayText(fullText.substring(0, displayText.length - 1));
      setTypingSpeed(75);
    } else {
      setDisplayText(fullText.substring(0, displayText.length + 1));
      setTypingSpeed(150);
    }

    if (!isDeleting && displayText === fullText) {
      setTimeout(() => {
        setIsDeleting(true);
        setTypingSpeed(100);
      }, 1500);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setCurrentIndex((currentIndex + 1) % texts.length);
      setTypingSpeed(150);
    }
  };

  return (
    <span className="inline-block bg-gradient-to-r from-cyberpink via-cybercyan to-cyberamber bg-clip-text text-transparent transform-gpu will-change-transform">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};