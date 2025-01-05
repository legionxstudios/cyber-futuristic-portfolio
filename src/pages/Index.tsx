import { Helmet } from 'react-helmet-async';
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Tudor Stanescu Portfolio | #HireMeHuman</title>
        <meta name="description" content="Experienced SEO & Growth Marketing leader driving traffic, conversions, and innovation. Proven results in scaling brands and digital strategies." />
        <meta property="og:title" content="Tudor Stanescu Portfolio | #HireMeHuman" />
        <meta property="og:description" content="Experienced SEO & Growth Marketing leader driving traffic, conversions, and innovation. Proven results in scaling brands and digital strategies." />
      </Helmet>
      <main className="bg-cyberdark min-h-screen relative">
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </>
  );
};

export default Index;