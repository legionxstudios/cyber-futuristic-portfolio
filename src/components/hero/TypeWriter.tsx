import { useEffect, useState } from "react";

interface TypeWriterProps {
  texts: string[];
}

export const TypeWriter = ({ texts }: TypeWriterProps) => {
  const [displayText, setDisplayText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const animateText = () => {
      const currentText = texts[currentTextIndex];
      
      if (!isDeleting) {
        if (displayText === currentText) {
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, 3000);
          return;
        }
        
        setDisplayText(currentText.slice(0, displayText.length + 1));
        timeout = setTimeout(animateText, 100);
      } else {
        if (displayText === "") {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          timeout = setTimeout(animateText, 100);
          return;
        }
        
        setDisplayText(displayText.slice(0, -1));
        timeout = setTimeout(animateText, 50);
      }
    };

    timeout = setTimeout(animateText, 100);

    return () => clearTimeout(timeout);
  }, [displayText, currentTextIndex, isDeleting, texts]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyberpink to-cybercyan">
      {">_"} {displayText}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} ml-1`}>|</span>
    </span>
  );
};