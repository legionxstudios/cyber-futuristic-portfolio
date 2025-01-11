import { motion } from "framer-motion";
import { skills } from "@/data/skills";
import { Progress } from "./ui/progress";

const Skills = () => {
  return (
    <section id="skills" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyberpink/5 to-transparent" />
      
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyberpink to-cybercyan">
            Technical Arsenal
          </span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 hover-glow h-full"
            >
              <div className="flex flex-col items-center text-center h-full">
                <skill.icon className={`w-8 h-8 ${
                  index % 3 === 0 ? 'text-cyberpink' :
                  index % 3 === 1 ? 'text-cybercyan' :
                  'text-cyberamber'
                }`} />
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;