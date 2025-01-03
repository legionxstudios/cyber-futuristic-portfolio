import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="bg-cyberdark min-h-screen">
      <Hero />
      <Skills />
      <Projects />
    </div>
  );
};

export default Index;