import { motion } from "framer-motion";

export const Contact = () => {
  return (
    <section id="contact" className="py-20 relative">
      {/* Astronaut Image */}
      <div className="absolute -top-32 left-0 w-96 h-96 pointer-events-none select-none">
        <img 
          src="/lovable-uploads/64a9147e-2a61-4d98-a48d-fb43097470fb.png" 
          alt="Decorative astronaut" 
          className="w-full h-full object-contain"
        />
      </div>
      
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Get in Touch
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-lg text-gray-300 mb-8"
        >
          I’d love to hear from you! Whether you have a question or just want to say hi, feel free to reach out.
        </motion.p>

        <form className="max-w-lg mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
            <input type="text" id="name" className="w-full p-2 rounded bg-gray-800 border border-gray-700" required />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
            <input type="email" id="email" className="w-full p-2 rounded bg-gray-800 border border-gray-700" required />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
            <textarea id="message" className="w-full p-2 rounded bg-gray-800 border border-gray-700" rows="4" required></textarea>
          </div>
          <button type="submit" className="w-full p-3 rounded bg-cyberpink text-white hover:bg-cyberamber transition-colors">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};
