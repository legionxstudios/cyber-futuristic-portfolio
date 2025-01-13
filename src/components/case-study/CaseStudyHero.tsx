import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";

interface CaseStudyHeroProps {
  caseStudy: {
    title: string;
    subtitle: string;
    cover_image: string;
    client?: string;
  };
}

const CaseStudyHero = ({ caseStudy }: CaseStudyHeroProps) => {
  return (
    <>
      <Navigation showBack={true} backUrl="/case-studies" />
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative min-h-[80vh] flex items-center justify-center"
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
            {/* Client Badge */}
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
                {caseStudy.client || "CASE STUDY"}
              </Badge>
            </motion.div>

            {/* Image Container */}
            <div className="relative">
              <div className="w-full aspect-[21/9] rounded-lg overflow-hidden">
                <img 
                  src={caseStudy.cover_image}
                  alt={caseStudy.title}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Title Box - Overlays the image */}
              <div className="w-[90%] max-w-4xl mx-auto -mt-16 relative z-20">
                <div className="glass-card p-8 backdrop-blur-lg bg-cyberdark/90">
                  <div className="bg-black/50 p-4 rounded-lg text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                      <span className="bg-gradient-to-r from-cyberpink to-cybercyan bg-clip-text text-transparent drop-shadow-lg">
                        {caseStudy.title}
                      </span>
                    </h1>
                    <p className="text-lg text-gray-200">
                      {caseStudy.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default CaseStudyHero;