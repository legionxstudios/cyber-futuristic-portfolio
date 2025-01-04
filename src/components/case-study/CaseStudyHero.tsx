import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const CaseStudyHero = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-[90vh] flex items-center justify-center py-20"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-cyberpink/10 to-transparent" />
      
      {/* Hero Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          {/* Format Badge */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <Badge 
              variant="outline" 
              className="px-4 py-2 rounded-full text-sm font-medium bg-glass backdrop-blur-sm border border-cyberpink/20 text-cyberpink animate-glow"
            >
              FORMAT
            </Badge>
          </motion.div>

          {/* Image Container */}
          <div className="relative">
            {/* Top Image Section */}
            <div className="w-full aspect-[21/9] rounded-t-lg overflow-hidden">
              <img 
                src="/lovable-uploads/ab75de39-3ba3-4352-b67c-fbd6c00decae.png"
                alt="Format portfolio builder showcase"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title Box - Now cuts through the image */}
            <div className="w-[90%] max-w-4xl mx-auto -mt-16 relative z-20">
              <div className="glass-card p-8 backdrop-blur-md">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyberpink to-cybercyan">
                    Growing Organic Traffic from 100K to 450K Monthly Visits
                  </span>
                </h1>
                <p className="text-lg text-gray-300">
                  An in-depth exploration of strategic SEO implementation and its impact on Format's digital presence
                </p>
              </div>
            </div>

            {/* Bottom Image Section */}
            <div className="w-full aspect-[21/9] -mt-16 pt-16 rounded-b-lg overflow-hidden bg-cyberdark">
              {/* This space intentionally left empty for the title box overlay effect */}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CaseStudyHero;