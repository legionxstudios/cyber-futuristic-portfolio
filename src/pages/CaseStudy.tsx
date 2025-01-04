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
      
      {/* Results Graph */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="glass-card p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Results & Impact</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold text-cyberpink mb-2">Traffic Growth</h3>
                    <p className="text-gray-300">Increased monthly visits from 100K to 450K</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold text-cybercyan mb-2">Lead Generation</h3>
                    <p className="text-gray-300">25% of total business leads now come from organic traffic</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold text-cyberamber mb-2">Visitor Engagement</h3>
                    <p className="text-gray-300">Over 1M unique organic visitors in the first year</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold text-cyberpink mb-2">Budget Efficiency</h3>
                    <p className="text-gray-300">Achieved results using only 60% of allocated budget</p>
                  </div>
                </div>
              </div>
              <div className="aspect-video relative overflow-hidden rounded-lg">
                <img 
                  src="/lovable-uploads/6afca98e-94f3-4d18-a044-2b884c4f57a4.png"
                  alt="Traffic growth graph showing increase from 100K to 450K monthly visits"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <ToolsSection />
    </div>
  );
};

export default CaseStudy;