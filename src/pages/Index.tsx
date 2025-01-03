import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="bg-cyberdark min-h-screen">
      <Hero />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
};

export default Index;