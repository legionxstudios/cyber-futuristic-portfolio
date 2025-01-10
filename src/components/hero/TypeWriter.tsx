import { useState, useEffect } from 'react';

interface TypeWriterProps {
  texts: string[];
}

export const TypeWriter = ({ texts }: TypeWriterProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayText(texts[0]);
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % texts.length;
        setDisplayText(texts[nextIndex]);
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [texts]);

  return (
    <span className="inline-block transform-gpu will-change-transform">
      {displayText}
    </span>
  );
};