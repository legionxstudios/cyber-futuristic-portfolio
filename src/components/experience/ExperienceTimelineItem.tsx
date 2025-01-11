import { motion } from "framer-motion";
import { Building2, ExternalLink, CheckCircle } from "lucide-react";

interface ExperienceTimelineItemProps {
  experience: {
    date: string;
    company: string;
    website: string;
    location: string;
    role: string;
    description: string[];
  };
  index: number;
}

const ExperienceTimelineItem = ({ experience, index }: ExperienceTimelineItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      {/* Date on the opposite side - hidden on mobile */}
      <div 
        className={`hidden md:block text-cyberpink font-medium absolute top-2 ${
          index % 2 === 0 
            ? 'left-[52%] pl-8' 
            : 'right-[52%] pr-8 text-right'
        }`}
      >
        {experience.date}
      </div>

      {/* Card */}
      <div className={`glass-card p-6 hover-glow w-full ${
        index % 2 === 0 
          ? 'md:col-start-1 md:mr-auto' 
          : 'md:col-start-2 md:ml-auto'
      }`}>
        {/* Mobile date display */}
        <div className="md:hidden text-cyberpink font-medium mb-4">
          {experience.date}
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-2">{experience.role}</h3>
        
        <div className="flex items-center gap-2 mb-1 text-cybercyan">
          <Building2 className="w-4 h-4" />
          <a 
            href={experience.website}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="hover:text-cyberpink transition-colors flex items-center gap-1"
          >
            {experience.company}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
        
        <div className="text-gray-400 text-sm mb-4">{experience.location}</div>
        
        {experience.description.length > 0 && (
          <div className="space-y-3 mt-4 border-t border-white/10 pt-4">
            {experience.description.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 group"
              >
                <div className="mt-1 flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-cyberpink group-hover:text-cyberamber transition-colors" />
                </div>
                <p className="text-gray-300 group-hover:text-white transition-colors">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Timeline dot - hidden on mobile */}
      <div className="absolute left-1/2 top-2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-cyberpink hidden md:block" />
    </motion.div>
  );
};

export default ExperienceTimelineItem;