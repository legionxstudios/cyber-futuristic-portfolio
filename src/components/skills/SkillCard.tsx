import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Code2 } from "lucide-react";
import { type Skill, ICON_MAP } from "../Skills";

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export const SkillCard = ({ skill, index }: SkillCardProps) => {
  const Icon = ICON_MAP[skill.icon] || Code2;
  
  if (!ICON_MAP[skill.icon]) {
    console.warn(`Icon "${skill.icon}" not found in icon map, using default Code2 icon`);
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card p-6 hover-glow h-full"
    >
      <div className="flex flex-col items-center text-center h-full">
        <Icon 
          className={`w-8 h-8 ${
            index % 3 === 0 ? 'text-cyberpink' :
            index % 3 === 1 ? 'text-cybercyan' :
            'text-cyberamber'
          }`}
        />
        <h3 className="mt-4 text-xl font-semibold text-white">{skill.title}</h3>
        <p className="mt-2 text-gray-400">{skill.description}</p>
        <p className="mt-2 text-sm text-gray-500 flex-grow">{skill.focus}</p>
        <div className="w-full space-y-2 mt-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Proficiency</span>
            <span className="text-cyberpink">{skill.proficiency}%</span>
          </div>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1, delay: index * 0.2 }}
          >
            <Progress value={skill.proficiency} className="h-2" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};