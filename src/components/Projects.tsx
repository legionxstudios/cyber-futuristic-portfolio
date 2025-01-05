import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
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

  // Function to insert the new case study
  const insertNewCaseStudy = async () => {
    const { error } = await supabase
      .from('case_studies')
      .insert([
        {
          title: "Implementing Product SEO to Drive Organic Traffic for Format",
          subtitle: "How we transformed Format's website templates to better align with search intent",
          slug: "format-2",
          client: "Format",
          challenge: [
            "Format's existing website templates were generalized frameworks showcasing DIY website builder capabilities",
            "Only 7 broad themes were available",
            "Significant opportunity to better align product offering with search intent",
            "Need to drive more organic traffic for non-branded, commercial terms"
          ],
          solution: [
            "Partnered with product team to 'productize' search terms",
            "Conducted keyword research for high-value niche-specific terms",
            "Transformed 7 generalized themes into 51 niche-specific templates",
            "Categorized templates into targeted niches",
            "Optimized pages for SEO with targeted keywords"
          ],
          key_takeaways: [
            "Google favors informational content for certain queries",
            "Created roundup articles for better conversion",
            "Account for development timelines in marketing planning"
          ],
          tools_used: [
            "Keyword Research Tools",
            "SEO Analytics",
            "Content Management System",
            "Web Development",
            "Google Search Console"
          ],
          traffic_initial: 0,
          traffic_final: 5000,
          unique_visitors: "5,000 monthly organic visitors",
          lead_generation: "2x conversion rate increase",
          budget_efficiency: "3 months to results",
          cover_image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
          traffic_heading: "Traffic Growth",
          visitors_heading: "Visitor Engagement",
          leads_heading: "Conversion Impact",
          budget_heading: "Time to Results"
        }
      ]);

    if (error) {
      console.error('Error inserting case study:', error);
    } else {
      console.log('Successfully inserted new case study');
    }
  };

  // Removing the function call since the case study has already been inserted
  // insertNewCaseStudy();

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
              >
                <Link
                  to={`/${study.slug}`}
                  className="block glass-card overflow-hidden group hover-glow"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={study.cover_image}
                      alt={study.title}
                      className="w-full h-48 object-cover object-top transform transition-transform duration-500 group-hover:scale-110"
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
                      <span className="flex items-center gap-2 text-gray-400 group-hover:text-white transition-colors">
                        <ExternalLink className="w-5 h-5" />
                        View Case Study
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};