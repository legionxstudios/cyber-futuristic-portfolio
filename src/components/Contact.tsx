import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";

export const Contact = () => {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyberblue/5 to-transparent" />
      
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyberpink to-cybercyan">
            Let's Connect
          </span>
        </motion.h2>
        
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 text-center"
          >
            <p className="text-lg text-gray-300 mb-8">
              Ready to collaborate? Let's create something amazing together.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <a
                href="mailto:your.email@example.com"
                className="flex flex-col items-center gap-2 text-gray-400 hover:text-cyberpink transition-colors group"
              >
                <div className="p-4 rounded-full border border-gray-700 group-hover:border-cyberpink transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <span>Email</span>
              </a>
              
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 text-gray-400 hover:text-cybercyan transition-colors group"
              >
                <div className="p-4 rounded-full border border-gray-700 group-hover:border-cybercyan transition-colors">
                  <Github className="w-6 h-6" />
                </div>
                <span>GitHub</span>
              </a>
              
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 text-gray-400 hover:text-cyberamber transition-colors group"
              >
                <div className="p-4 rounded-full border border-gray-700 group-hover:border-cyberamber transition-colors">
                  <Linkedin className="w-6 h-6" />
                </div>
                <span>LinkedIn</span>
              </a>
              
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 text-gray-400 hover:text-cyberblue transition-colors group"
              >
                <div className="p-4 rounded-full border border-gray-700 group-hover:border-cyberblue transition-colors">
                  <Twitter className="w-6 h-6" />
                </div>
                <span>Twitter</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};