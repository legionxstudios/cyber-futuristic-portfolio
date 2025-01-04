import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

export const Projects = () => {
  const { data: caseStudies, isLoading } = useQuery({
    queryKey: ['featured-case-studies'],
    queryFn: async () => {
      console.log('Fetching case studies...');
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) {
        console.error('Error fetching case studies:', error);
        throw error;
      }
      
      console.log('Fetched case studies:', data);
      return data;
    },
  });

  return (
    <section id="featured-projects" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cybercyan/5 to-transparent" />
      
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cybercyan to-cyberamber">
            Featured Case Studies
          </span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <p className="text-white">Loading case studies...</p>
          ) : (
            caseStudies?.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card overflow-hidden group hover-glow"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={study.cover_image}
                    alt={study.title}
                    className="w-full h-48 object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyberdark to-transparent opacity-60" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{study.title}</h3>
                  <p className="text-gray-400 mb-4">{study.subtitle}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Array.isArray(study.tools_used) && study.tools_used.map((tool: string, tagIndex: number) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 text-sm rounded-full bg-cyberdark text-cyberpink border border-cyberpink/20"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Link
                      to={`/${study.slug}`}
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                      View Case Study
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};