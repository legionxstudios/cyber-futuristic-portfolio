import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { TestimonialCarousel } from "./TestimonialCarousel";
import { ScrollIndicator } from "./ScrollIndicator";
import { TypeWriter } from "./hero/TypeWriter";
import { RoleSelector } from "./hero/RoleSelector";
import { VideoDialog } from "./hero/VideoDialog";

type RoleContent = {
  [key: string]: string;
};

export const Hero = () => {
  const [selectedTitle, setSelectedTitle] = useState("SEO");
  const titles = ["SEO", "Web", "Content", "Growth", "CRO", "AI"];
  const texts = ["#HireMeHuman", "Tudor Stanescu"];

  const roleContent: RoleContent = {
    "SEO": "Increased organic traffic by up to 300% and improved conversion rates by 40% through advanced SEO strategies.",
    "Web": "Enhanced website performance with 25% higher organic sessions and 30% boost in lead conversions.",
    "Content": "Led content strategies generating 50% YoY organic growth with scalable, data-driven production systems.",
    "Growth": "Scaled businesses with 2x traffic growth and 75% reduced CAC through a unique ad video framework.",
    "CRO": "Improved conversion rates by 39% with A/B testing and holistic experimentation frameworks.",
    "AI": "Developed AI-powered SEO tools driving 18% higher conversions and scaling content production by 50%."
  };

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && titles.includes(hash)) {
      setSelectedTitle(hash);
    }
  }, []);

  const handleRoleSelect = (role: string) => {
    setSelectedTitle(role);
    window.location.hash = role;
  };

  return (
    <motion.div 
      id="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cyberdark pt-20 md:pt-0"
    >
      <ScrollIndicator />
      <div className="absolute inset-0 bg-[url('/lovable-uploads/820a6b6e-989e-48b8-97ee-8aac1d2f0c72.png')] bg-cover bg-center opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-t from-cyberdark via-transparent to-transparent" />
      
      <div className="relative z-10 text-center px-4 w-full max-w-7xl mx-auto">
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
            onSelect={handleRoleSelect}
          />
        </motion.div>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-xl text-gray-300 max-w-[90%] sm:max-w-2xl mx-auto bg-black/30 p-4 rounded-lg"
        >
          {roleContent[selectedTitle]}
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
