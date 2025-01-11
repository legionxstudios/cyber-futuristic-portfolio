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
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleType();
    }, typingSpeed);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => {
      clearTimeout(timer);
      clearInterval(cursorInterval);
    };
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
    <span className="inline-block">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyberpink to-cybercyan">
        {'>_'} {displayText}
        <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-75`}>|</span>
      </span>
    </span>
  );
};