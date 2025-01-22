import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import ExperienceTimelineItem from "./experience/ExperienceTimelineItem";
import { Skeleton } from "@/components/ui/skeleton";

const Experience = () => {
  const { data: experiences, isLoading, error } = useQuery({
    queryKey: ['work-experience'],
    queryFn: async () => {
      console.log('Fetching work experience...');
      const { data, error } = await supabase
        .from('work_experience')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching work experience:', error);
        throw error;
      }
      
      console.log('Fetched work experience:', data);
      return data;
    },
  });

  if (error) {
    console.error('Error in Experience component:', error);
    return (
      <div className="py-20 text-center text-red-500">
        Failed to load experience data. Please try again later.
      </div>
    );
  }

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
          {/* Vertical line - hidden on mobile */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-cyberpink via-cybercyan to-cyberamber hidden md:block" />

          <div className="space-y-12">
            {isLoading ? (
              // Loading skeletons
              Array(3).fill(null).map((_, index) => (
                <div key={index} className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className={`glass-card p-6 w-full ${
                    index % 2 === 0 
                      ? 'md:col-start-1 md:mr-auto' 
                      : 'md:col-start-2 md:ml-auto'
                  }`}>
                    <Skeleton className="h-6 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <Skeleton className="h-4 w-1/3 mb-4" />
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-5/6" />
                      <Skeleton className="h-3 w-4/6" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              experiences?.map((exp, index) => (
                <ExperienceTimelineItem 
                  key={exp.id} 
                  experience={{
                    date: exp.date_range,
                    company: exp.company,
                    website: exp.website || '',
                    location: exp.location,
                    role: exp.role,
                    description: exp.description
                  }}
                  index={index} 
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;