import { motion } from "framer-motion";
import { Target, Lightbulb, CheckCircle2 } from "lucide-react";

const MainContent = () => {
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
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 mt-1 text-cyberpink" />
                  <span>Stagnant organic traffic at 100K monthly visits</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 mt-1 text-cyberpink" />
                  <span>Heavy reliance on branded search terms</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 mt-1 text-cyberpink" />
                  <span>Blog not contributing to lead generation</span>
                </li>
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
                <div>
                  <h3 className="text-xl font-semibold mb-2">Team Expansion</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>Hired full-time SEO editor</li>
                    <li>Built 20+ freelance writer network</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Content Strategy</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>200+ articles in 6 months</li>
                    <li>Pillar content structure</li>
                    <li>Strategic internal linking</li>
                  </ul>
                </div>
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
              <div className="p-4 bg-white/5 rounded-lg">
                <h3 className="font-semibold mb-2">Top-Performing Content</h3>
                <p className="text-gray-300">Inspirational and monetization-focused content drove highest engagement</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <h3 className="font-semibold mb-2">Pillar Strategy Success</h3>
                <p className="text-gray-300">Strategic internal linking improved both blog and product page performance</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <h3 className="font-semibold mb-2">Effective CTAs</h3>
                <p className="text-gray-300">Product-focused CTAs significantly improved conversion rates</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MainContent;
