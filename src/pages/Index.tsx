import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    const updateScroll = () => {
      document.documentElement.style.setProperty('--scroll', `${window.scrollY}px`);
    };

    document.documentElement.style.scrollBehavior = 'smooth';
    window.addEventListener('scroll', updateScroll);
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      window.removeEventListener('scroll', updateScroll);
    };
  }, []);

  return (
    <main className="bg-cyberdark min-h-screen relative">
      {/* Light trail effect */}
      <div className="light-trail" />
      
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </main>
  );
};

export default Index;