import { motion } from "framer-motion";
import { Code2, Cpu, Palette, Terminal } from "lucide-react";

const skills = [
  {
    icon: <Code2 className="w-8 h-8 text-cyberpink" />,
    title: "Frontend Development",
    description: "React, TypeScript, Tailwind CSS",
  },
  {
    icon: <Terminal className="w-8 h-8 text-cybercyan" />,
    title: "Backend Development",
    description: "Node.js, Python, SQL",
  },
  {
    icon: <Cpu className="w-8 h-8 text-cyberamber" />,
    title: "DevOps",
    description: "Docker, AWS, CI/CD",
  },
  {
    icon: <Palette className="w-8 h-8 text-cyberblue" />,
    title: "UI/UX Design",
    description: "Figma, Adobe XD, Prototyping",
  },
];

export const Skills = () => {
  return (
    <section className="py-20 relative">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 hover-glow"
            >
              <div className="flex flex-col items-center text-center">
                {skill.icon}
                <h3 className="mt-4 text-xl font-semibold text-white">{skill.title}</h3>
                <p className="mt-2 text-gray-400">{skill.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};