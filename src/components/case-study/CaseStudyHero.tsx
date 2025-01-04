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
          <Badge 
            variant="outline" 
            className="mb-6 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          >
            FORMAT
          </Badge>

          {/* Image and Title Box Container */}
          <div className="relative">
            {/* Main Image */}
            <div className="w-full aspect-[21/9] rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/ab75de39-3ba3-4352-b67c-fbd6c00decae.png"
                alt="Format portfolio builder showcase"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title Box Overlay - Now spans across image and background */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl glass-card p-8 backdrop-blur-md">
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
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CaseStudyHero;