import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Position {
  x: number;
  y: number;
}

export const CursorTrail = () => {
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });
  const [trail, setTrail] = useState<Position[]>([]);
  const [isInHero, setIsInHero] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const heroElement = document.getElementById('hero-section');
      if (!heroElement) return;

      const rect = heroElement.getBoundingClientRect();
      
      // Check if mouse is within hero section
      const isWithinHero = 
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      setIsInHero(isWithinHero);
      
      if (isWithinHero) {
        const newPosition = {
          x: e.clientX,
          y: e.clientY
        };
        setMousePosition(newPosition);
        setTrail(prev => [...prev, newPosition].slice(-20)); // Keep last 20 positions
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  if (!isInHero) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <AnimatePresence>
        {trail.map((position, index) => (
          <motion.div
            key={`${position.x}-${position.y}-${index}`}
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{ scale: 0, opacity: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: 'fixed',
              left: position.x - 8,
              top: position.y - 8,
              width: '16px',
              height: '16px',
            }}
            className="rounded-full bg-gradient-to-r from-cyberpink to-cybercyan blur-sm"
          />
        ))}
      </AnimatePresence>
    </div>
  );
};