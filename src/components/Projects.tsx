import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export default function Projects() {
  const { data: caseStudies, isLoading } = useQuery({
    queryKey: ["case-studies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      console.log("Fetched case studies:", data);
      return data;
    },
  });

  return (
    <section id="projects" className="py-24 bg-cyberdark">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cybercyan to-cyberamber">
            Case Studies
          </span>
        </h2>

        {isLoading ? (
          <div className="text-center">Loading case studies...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {caseStudies?.map((study) => (
                <Link
                  key={study.id}
                  to={`/${study.slug}`}
                  className="block glass-card overflow-hidden group hover:scale-105 transform transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={study.cover_image}
                      alt={study.title}
                      className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyberdark to-transparent opacity-60 transform transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {study.business_type && (
                        <Badge 
                          variant="outline" 
                          className="border-cyberpink text-cyberpink hover:bg-cyberpink/10"
                        >
                          {study.business_type}
                        </Badge>
                      )}
                      {study.industry && (
                        <Badge 
                          variant="outline" 
                          className="border-cybercyan text-cybercyan hover:bg-cybercyan/10"
                        >
                          {study.industry}
                        </Badge>
                      )}
                      {study.channel && (
                        <Badge 
                          variant="outline" 
                          className="border-cyberamber text-cyberamber hover:bg-cyberamber/10"
                        >
                          {study.channel}
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{study.title}</h3>
                    <p className="text-gray-400 mb-4">{study.subtitle}</p>
                    <div className="mt-auto text-cyberpink hover:text-cyberamber transition-colors flex items-center gap-2">
                      Read Case Study
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link to="/case-studies">
                <Button 
                  variant="outline" 
                  className="group border-cyberpink text-cyberpink hover:bg-cyberpink hover:text-white"
                >
                  View All Case Studies
                  <ArrowRight className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}