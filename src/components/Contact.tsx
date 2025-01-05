import { motion } from "framer-motion";
import { Mail, Linkedin } from "lucide-react";
import { InlineWidget } from "react-calendly";

export const Contact = () => {
  return (
    <section id="contact" className="py-20 relative">
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
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8"
          >
            <p className="text-lg text-gray-300 mb-8 text-center">
              Ready to collaborate? Let's create something amazing together.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <a
                href="mailto:tudorfilms@gmail.com"
                className="flex flex-col items-center gap-2 text-gray-400 hover:text-cyberpink transition-colors group"
              >
                <div className="p-4 rounded-full border border-gray-700 group-hover:border-cyberpink transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <span>Email</span>
              </a>
              
              <a
                href="https://www.linkedin.com/in/tudorstanescu/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 text-gray-400 hover:text-cyberamber transition-colors group"
              >
                <div className="p-4 rounded-full border border-gray-700 group-hover:border-cyberamber transition-colors">
                  <Linkedin className="w-6 h-6" />
                </div>
                <span>LinkedIn</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8"
          >
            <InlineWidget url="https://calendly.com/meetwithtudor/30min" styles={{ height: '500px' }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};