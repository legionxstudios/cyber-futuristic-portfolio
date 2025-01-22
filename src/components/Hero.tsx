import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { TestimonialCarousel } from "./TestimonialCarousel";
import { ScrollIndicator } from "./ScrollIndicator";
import { TypeWriter } from "./hero/TypeWriter";
import { RoleSelector } from "./hero/RoleSelector";
import { VideoDialog } from "./hero/VideoDialog";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type RoleContent = {
  [key: string]: string;
};

export const Hero = () => {
  const [selectedTitle, setSelectedTitle] = useState("SEO");
  const [imageLoaded, setImageLoaded] = useState(false);
  const titles = ["SEO", "Web", "Content", "Growth", "CRO", "AI"];

  const { data: settings } = useQuery({
    queryKey: ["homepageSettings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("homepage_settings")
        .select("*")
        .single();

      if (error) throw error;
      return data;
    },
  });

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

  const heroImageUrl = settings?.hero_image 
    ? settings.hero_image.replace(/\.png$/, '.webp')
    : '/lovable-uploads/7258cc15-bf02-4def-8f58-16354b60a865.webp';

  useEffect(() => {
    if (heroImageUrl) {
      const img = new Image();
      img.src = heroImageUrl;
      img.onload = () => setImageLoaded(true);
    }
  }, [heroImageUrl]);

  const texts = [
    settings?.main_heading || "#HireMeHuman",
    settings?.sub_heading || "Tudor Stanescu"
  ];

  return (
    <section 
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cyberdark"
    >
      <ScrollIndicator />
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
          imageLoaded ? 'opacity-30' : 'opacity-0'
        }`}
        style={{ 
          backgroundImage: `url('${heroImageUrl}')`,
          willChange: 'opacity'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-cyberdark via-transparent to-transparent" />
      
      <div className="relative z-10 text-center px-1 sm:px-4 w-full max-w-7xl mx-auto pt-32 md:pt-40">
        <div className="transform-gpu">
          <span className="inline-block px-3 py-1.5 rounded-full text-sm font-medium bg-glass backdrop-blur-sm border border-cyberpink/20 text-cyberpink">
            Available for hire
          </span>
        </div>
        
        <h1 className="mt-6 mb-3 text-4xl sm:text-4xl md:text-6xl font-bold font-mono min-h-[2.5em] sm:min-h-0">
          <TypeWriter texts={texts} />
        </h1>

        <div className="mb-6">
          <RoleSelector 
            selectedTitle={selectedTitle}
            titles={titles}
            onSelect={handleRoleSelect}
          />
        </div>
        
        <p className="mt-4 text-xl sm:text-xl text-gray-300 max-w-[98%] sm:max-w-2xl mx-auto bg-black/30 p-4 rounded-lg transform-gpu will-change-transform">
          {settings?.role_content?.[selectedTitle] || "Loading..."}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-8">
          <VideoDialog />

          <a 
            href={settings?.cta_secondary_link || "#contact"}
            className="px-8 py-3 rounded-lg bg-glass backdrop-blur-sm border border-white/10 text-white font-medium hover:bg-white/10 transition-colors hover:shadow-lg hover:shadow-white/20 inline-block transform-gpu"
          >
            {settings?.cta_secondary_text || "Contact Me"}
          </a>
        </div>

        <TestimonialCarousel />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-12 flex flex-col items-center gap-2 text-white/80"
        >
          <span className="text-sm font-medium">See work experience below</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </div>
    </section>
  );
};