import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Play } from "lucide-react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TestimonialCarousel } from "./TestimonialCarousel";
import { ScrollIndicator } from "./ScrollIndicator";

export const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const texts = ["#HireMeHuman", "Tudor Stanescu"];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [selectedTitle, setSelectedTitle] = useState("SEO");

  const titles = ["SEO", "Web", "Content", "Growth", "CRO"];

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
          // Wait 3 seconds before starting to delete
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
  }, [displayText, currentTextIndex, isDeleting]);

  return (
    <motion.div 
      id="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cyberdark"
    >
      <ScrollIndicator />
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
          Over a Decade of Driving Growth with Data-Driven Marketing, Advanced SEO, and Proven CRO Techniques
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-8"
        >
          <Dialog>
            <DialogTrigger asChild>
              <button className="group relative flex items-center gap-3 px-6 py-3 rounded-full bg-cyberpink text-white font-medium hover:bg-cyberpink/90 transition-all hover:shadow-lg hover:shadow-cyberpink/20">
                <div className="absolute inset-0 rounded-full bg-cyberpink blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                <Play className="relative z-10" />
                <span className="relative z-10">Watch the #HireMeHuman movie</span>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl bg-cyberdark p-0 border-cyberpink/20">
              <div className="aspect-video">
                <LiteYouTubeEmbed 
                  id="dQw4w9WgXcQ"
                  title="#HireMeHuman Movie"
                  poster="maxresdefault"
                />
              </div>
            </DialogContent>
          </Dialog>

          <a 
            href="#contact"
            className="px-8 py-3 rounded-lg bg-glass backdrop-blur-sm border border-white/10 text-white font-medium hover:bg-white/10 transition-colors hover:shadow-lg hover:shadow-white/20 inline-block"
          >
            Contact Me
          </a>
        </motion.div>

        <TestimonialCarousel />
      </div>
    </motion.div>
  );
};