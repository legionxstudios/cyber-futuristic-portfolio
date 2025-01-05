import { motion } from "framer-motion";
import { Target, Gift } from "lucide-react";

export const VersusSection = () => {
  return (
    <section id="versus" className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyberpink/20 via-transparent to-cyberamber/20 opacity-20" />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 relative">
          {/* Left side - What I'm looking for */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex-1 transform md:rotate-2"
          >
            <div className="glass-card p-8 hover-glow">
              <Target className="w-12 h-12 mb-4 text-cyberpink" />
              <h3 className="text-2xl font-bold mb-4 text-white">What I'm Looking For</h3>
              <div className="space-y-4 text-gray-300">
                <p className="italic text-center text-lg">Content coming soon...</p>
              </div>
            </div>
          </motion.div>

          {/* VS Element */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring" }}
            className="relative z-10 mx-[-2rem]"
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyberpink via-cyberamber to-cybercyan flex flex-col items-center justify-center transform rotate-12 animate-pulse shadow-lg shadow-cyberpink/20">
              <span className="text-4xl font-bold text-white transform -rotate-12 relative">
                VS
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 animate-[strike_0.3s_ease-in-out_forwards]" />
              </span>
            </div>
          </motion.div>

          {/* Right side - What I bring */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex-1 transform md:-rotate-2"
          >
            <div className="glass-card p-8 hover-glow">
              <Gift className="w-12 h-12 mb-4 text-cyberamber" />
              <h3 className="text-2xl font-bold mb-4 text-white">What I Bring to the Table</h3>
              <div className="space-y-4 text-gray-300">
                <p className="italic text-center text-lg">Content coming soon...</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};