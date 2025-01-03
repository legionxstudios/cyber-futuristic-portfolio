import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { ParticlesBackground } from "@/components/Particles";

const Index = () => {
  return (
    <main className="bg-cyberdark min-h-screen relative">
      <ParticlesBackground />
      <Hero />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
};

export default Index;