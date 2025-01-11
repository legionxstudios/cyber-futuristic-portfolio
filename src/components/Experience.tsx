import { motion } from "framer-motion";
import ExperienceTimelineItem from "./experience/ExperienceTimelineItem";
import { experiences } from "./experience/ExperienceData";

const Experience = () => {
  return (
    <section id="experience" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cybercyan/5 to-transparent" />
      
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cybercyan to-cyberamber">
            Work Experience
          </span>
        </motion.h2>

        <div className="relative">
          {/* Vertical line - hidden on mobile */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-cyberpink via-cybercyan to-cyberamber hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <ExperienceTimelineItem 
                key={exp.company} 
                experience={exp} 
                index={index} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;