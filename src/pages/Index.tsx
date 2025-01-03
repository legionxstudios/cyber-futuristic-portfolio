import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { ParticlesBackground } from "@/components/Particles";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <main className="bg-cyberdark min-h-screen relative">
      <ParticlesBackground />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </main>
  );
};

export default Index;