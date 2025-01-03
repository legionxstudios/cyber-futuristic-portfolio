import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { ParticlesBackground } from "@/components/Particles";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="bg-cyberdark min-h-screen relative">
      <ParticlesBackground />
      <Hero />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
};

export default Index;