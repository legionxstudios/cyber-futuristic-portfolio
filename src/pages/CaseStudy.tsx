import { motion } from "framer-motion";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import ResultsOverview from "@/components/case-study/ResultsOverview";
import MainContent from "@/components/case-study/MainContent";
import ToolsSection from "@/components/case-study/ToolsSection";
import { TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InlineWidget } from "react-calendly";

const CaseStudy = () => {
  return (
    <div className="min-h-screen bg-cyberdark text-white pb-20">
      <CaseStudyHero />
      <ResultsOverview />
      <MainContent />
      
      {/* Results Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="glass-card p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-cyberpink" />
              <h2 className="text-2xl font-bold">Results & Impact</h2>
            </div>
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
              <div className="w-full h-[400px] relative rounded-lg overflow-hidden">
                <img 
                  src="/lovable-uploads/6afca98e-94f3-4d18-a044-2b884c4f57a4.png"
                  alt="Traffic growth graph showing increase from 100K to 450K monthly visits"
                  className="w-full h-full object-contain bg-white/5"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pre-footer CTA Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="glass-card p-8"
          >
            <div className="text-center space-y-6 max-w-3xl mx-auto mb-8">
              <h2 className="text-3xl font-bold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyberpink to-cybercyan">
                  Ready to Achieve Similar Results?
                </span>
              </h2>
              <p className="text-lg text-gray-300">
                Transform your organization's digital presence with data-driven strategies that deliver measurable results. Let's discuss how we can help you reach your goals.
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-cyberpink hover:bg-cyberpink/80 text-white"
                >
                  Contact Me
                </Button>
                <Button
                  variant="outline"
                  className="border-cybercyan text-cybercyan hover:bg-cybercyan/10"
                  onClick={() => document.getElementById('calendar')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule a Call
                </Button>
              </div>
            </div>
            <div id="calendar" className="max-w-3xl mx-auto">
              <InlineWidget url="https://calendly.com/meetwithtudor/30min" styles={{ height: '600px' }} />
            </div>
          </motion.div>
        </div>
      </section>

      <ToolsSection />
    </div>
  );
};

export default CaseStudy;