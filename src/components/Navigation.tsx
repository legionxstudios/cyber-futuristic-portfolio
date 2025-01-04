import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export const Navigation = ({ showBack = false }: { showBack?: boolean }) => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const text = ">_ #HireMeHuman";
    setDisplayText(text);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-cyberdark to-transparent">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-mono font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyberpink to-cybercyan">
            {displayText}
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} ml-1`}>|</span>
          </span>
        </Link>
        {showBack && (
          <Link 
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-glass backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        )}
      </div>
    </div>
  );
};