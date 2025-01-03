import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const fullText = "#HireMeHuman";
  const [showCursor, setShowCursor] = useState(true);
  const [selectedTitle, setSelectedTitle] = useState("SEO");

  const titles = ["SEO", "Web", "Content", "Growth", "CRO"];

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cyberdark"
    >
      <div className="absolute inset-0 bg-[url('/lovable-uploads/7258cc15-bf02-4def-8f58-16354b60a865.png')] bg-cover bg-center opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-cyberdark via-transparent to-transparent" />
      
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block"
        >
          <span className="px-4 py-2 rounded-full text-sm font-medium bg-glass backdrop-blur-sm border border-cyberpink/20 text-cyberpink animate-glow">
            Available for hire
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-4xl md:text-6xl font-bold text-white font-mono"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyberpink to-cybercyan">
            {">_"} {displayText}
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} ml-1`}>|</span>
          </span>
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 text-2xl md:text-3xl text-white flex items-center justify-center gap-2 flex-wrap"
        >
          <span className="text-cybercyan">Director of</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-glass backdrop-blur-sm border border-cyberpink/20 text-cyberpink hover:border-cyberpink/40 transition-colors">
              {selectedTitle}
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-cyberdark border border-cyberpink/20">
              {titles.map((title) => (
                <DropdownMenuItem
                  key={title}
                  onClick={() => setSelectedTitle(title)}
                  className="text-white hover:text-cyberpink hover:bg-white/5 cursor-pointer"
                >
                  {title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto"
        >
          10+ years of experience crafting digital experiences in the cyberpunk era
        </motion.p>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
        >
          <button className="px-8 py-3 rounded-lg bg-cyberpink text-white font-medium hover:bg-cyberpink/90 transition-colors hover:shadow-lg hover:shadow-cyberpink/20">
            View Projects
          </button>
          <button className="px-8 py-3 rounded-lg bg-glass backdrop-blur-sm border border-white/10 text-white font-medium hover:bg-white/10 transition-colors hover:shadow-lg hover:shadow-white/20">
            Contact Me
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};