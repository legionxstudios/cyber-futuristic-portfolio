import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Project Alpha",
    description: "A cutting-edge AI-powered analytics platform",
    tags: ["React", "Python", "TensorFlow"],
    image: "/placeholder.svg",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    title: "Project Beta",
    description: "Real-time data visualization dashboard",
    tags: ["TypeScript", "D3.js", "Node.js"],
    image: "/placeholder.svg",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    title: "Project Gamma",
    description: "Blockchain-based secure messaging system",
    tags: ["Solidity", "Web3.js", "React"],
    image: "/placeholder.svg",
    githubUrl: "#",
    liveUrl: "#",
  },
];

export const Projects = () => {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cybercyan/5 to-transparent" />
      
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cybercyan to-cyberamber">
            Featured Projects
          </span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card overflow-hidden hover-glow"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-sm rounded-full bg-cyberdark text-cyberpink border border-cyberpink/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.githubUrl}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    Code
                  </a>
                  <a
                    href={project.liveUrl}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};