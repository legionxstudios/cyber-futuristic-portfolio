import { motion } from "framer-motion";
import { Target, Lightbulb, CheckCircle2 } from "lucide-react";

interface MainContentProps {
  caseStudy: {
    challenge: string[];
    solution: string[];
    key_takeaways: string[];
  };
}

const MainContent = ({ caseStudy }: MainContentProps) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Problem & Solution */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Target className="text-cyberpink" />
                The Challenge
              </h2>
              <ul className="space-y-4 text-gray-300">
                {caseStudy.challenge.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-1 text-cyberpink" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Lightbulb className="text-cybercyan" />
                The Solution
              </h2>
              <div className="space-y-6">
                {caseStudy.solution.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-1 text-cybercyan" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Key Takeaways */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="glass-card p-8"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Lightbulb className="text-cyberamber" />
              Key Takeaways
            </h2>
            <div className="space-y-6">
              {caseStudy.key_takeaways.map((takeaway, index) => (
                <div key={index} className="p-4 bg-white/5 rounded-lg">
                  <p className="text-gray-300">{takeaway}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MainContent;