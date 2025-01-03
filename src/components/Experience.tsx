import { motion } from "framer-motion";
import { Calendar, Building2 } from "lucide-react";

const experiences = [
  {
    date: "2023 - Present",
    company: "Tech Innovators Inc.",
    role: "Senior Full Stack Developer",
    description: "Leading development of cloud-native applications and microservices architecture."
  },
  {
    date: "2021 - 2023",
    company: "Digital Solutions Co.",
    role: "Frontend Developer",
    description: "Developed responsive web applications using React and TypeScript."
  },
  {
    date: "2019 - 2021",
    company: "StartUp Labs",
    role: "Junior Developer",
    description: "Built and maintained various client-side applications."
  }
];

export const Experience = () => {
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
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-cyberpink via-cybercyan to-cyberamber" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <div className={`glass-card p-6 hover-glow ${index % 2 === 0 ? 'md:text-right' : 'md:col-start-2'}`}>
                  <div className="flex items-center gap-2 mb-2 text-cyberpink">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.date}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3 text-cybercyan">
                    <Building2 className="w-4 h-4" />
                    <span>{exp.company}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{exp.role}</h3>
                  <p className="text-gray-400">{exp.description}</p>
                </div>

                {/* Timeline dot */}
                <div className="absolute left-1/2 top-8 transform -translate-x-1/2 w-4 h-4 rounded-full bg-cyberpink" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};