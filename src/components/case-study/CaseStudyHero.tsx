import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const CaseStudyHero = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-[70vh] flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-cyberpink/10 to-transparent" />
      
      {/* Hero Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Format Badge */}
          <Badge 
            variant="outline" 
            className="mb-6 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          >
            FORMAT
          </Badge>

          {/* Title and Subtitle */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyberpink to-cybercyan">
              Growing Organic Traffic from 100K to 450K Monthly Visits
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A comprehensive analysis of Format's strategic SEO transformation and content optimization journey
          </p>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 max-w-5xl mx-auto"
        >
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden glass-card">
            <img 
              src="/lovable-uploads/ab75de39-3ba3-4352-b67c-fbd6c00decae.png"
              alt="Format portfolio builder showcase"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CaseStudyHero;