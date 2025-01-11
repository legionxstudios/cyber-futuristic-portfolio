import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "./ui/progress";
import { SkillCard } from "./skills/SkillCard";
import { 
  Database, 
  ChartLine, 
  Users, 
  Target, 
  Cpu,
  ArrowDown,
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  Code2,
  Brain,
  Search,
  LineChart,
  BarChart,
  PieChart,
  Workflow,
  Settings,
  Lightbulb,
  type LucideIcon 
} from "lucide-react";

// Create a map of allowed icons
export const ICON_MAP: Record<string, LucideIcon> = {
  Database,
  ChartLine,
  Users,
  Target,
  Cpu,
  ArrowDown,
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  Code2,
  Brain,
  Search,
  LineChart,
  BarChart,
  PieChart,
  Workflow,
  Settings,
  Lightbulb
};

export interface Skill {
  id: string;
  title: string;
  description: string;
  focus?: string;
  proficiency: number;
  icon: string;
}

const Skills = () => {
  const { data: skills, isLoading } = useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      console.log('Fetching skills...');
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) {
        console.error('Error fetching skills:', error);
        throw error;
      }
      
      console.log('Fetched skills:', data);
      return data as Skill[];
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
          {skills?.map((skill, index) => (
            <SkillCard 
              key={skill.id} 
              skill={skill} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
