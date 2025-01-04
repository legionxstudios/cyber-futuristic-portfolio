import { motion } from "framer-motion";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import ResultsOverview from "@/components/case-study/ResultsOverview";
import MainContent from "@/components/case-study/MainContent";
import ToolsSection from "@/components/case-study/ToolsSection";

const CaseStudy = () => {
  return (
    <div className="min-h-screen bg-cyberdark text-white pb-20">
      <CaseStudyHero />
      <ResultsOverview />
      <MainContent />
      <ToolsSection />
      
      {/* Results Graph */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="glass-card p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Traffic Growth Over Time</h2>
            <div className="aspect-video relative overflow-hidden rounded-lg">
              <img 
                src="/lovable-uploads/6afca98e-94f3-4d18-a044-2b884c4f57a4.png"
                alt="Traffic growth graph showing increase from 100K to 450K monthly visits"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudy;