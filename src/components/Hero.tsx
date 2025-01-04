import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { TestimonialCarousel } from "./TestimonialCarousel";
import { ScrollIndicator } from "./ScrollIndicator";
import { TypeWriter } from "./hero/TypeWriter";
import { RoleSelector } from "./hero/RoleSelector";
import { VideoDialog } from "./hero/VideoDialog";

export const Hero = () => {
  const [selectedTitle, setSelectedTitle] = useState("SEO");
  const titles = ["SEO", "Web", "Content", "Growth", "CRO"];
  const texts = ["#HireMeHuman", "Tudor Stanescu"];

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
          className="mt-8 mb-8 text-4xl md:text-6xl font-bold text-white font-mono"
        >
          <TypeWriter texts={texts} />
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <RoleSelector 
            selectedTitle={selectedTitle}
            titles={titles}
            onSelect={setSelectedTitle}
          />
        </motion.div>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto bg-black/30 p-4 rounded-lg"
        >
          Over a decade of driving growth with data-driven marketing, advanced SEO, and proven CRO techniques
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-8"
        >
          <VideoDialog />

          <a 
            href="#contact"
            className="px-8 py-3 rounded-lg bg-glass backdrop-blur-sm border border-white/10 text-white font-medium hover:bg-white/10 transition-colors hover:shadow-lg hover:shadow-white/20 inline-block"
          >
            Contact Me
          </a>
        </motion.div>

        <TestimonialCarousel />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: [0.4, 1, 0.4], y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mt-12 flex flex-col items-center gap-2 text-white/80"
        >
          <span className="text-sm font-medium">See work experience below</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </div>
    </motion.div>
  );
};