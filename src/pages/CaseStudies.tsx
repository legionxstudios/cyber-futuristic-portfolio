import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Filter, TrendingUp, Users, Target, PiggyBank } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const INDUSTRIES = ["All"];
const BUSINESS_TYPES = ["All"];

const CaseStudies = () => {
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedBusinessType, setSelectedBusinessType] = useState("All");

  const { data: caseStudies, isLoading } = useQuery({
    queryKey: ["case-studies", selectedIndustry, selectedBusinessType],
    queryFn: async () => {
      console.log("Fetching case studies with filters:", { selectedIndustry, selectedBusinessType });
      let query = supabase
        .from("case_studies")
        .select("*")
        .order("is_featured", { ascending: false });

      if (selectedIndustry !== "All") {
        query = query.eq("industry", selectedIndustry);
      }
      if (selectedBusinessType !== "All") {
        query = query.eq("business_type", selectedBusinessType);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error("Error fetching case studies:", error);
        throw error;
      }
      
      console.log("Fetched case studies:", data);
      return data;
    },
  });

  const featuredStudy = caseStudies?.find(study => study.is_featured);
  const regularStudies = caseStudies?.filter(study => !study.is_featured);

  return (
    <>
      <Navigation showBack={true} />
      <main className="min-h-screen bg-cyberdark pt-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cybercyan to-cyberamber">
              Case Studies
            </span>
          </h1>
          
          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <aside className="w-64 space-y-8">
              <div className="glass-card p-6 space-y-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Business Type</h3>
                    <div className="space-y-2">
                      {BUSINESS_TYPES.map((type) => (
                        <Button
                          key={type}
                          variant={selectedBusinessType === type ? "default" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => setSelectedBusinessType(type)}
                        >
                          {type}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Industry</h3>
                    <div className="space-y-2">
                      {INDUSTRIES.map((industry) => (
                        <Button
                          key={industry}
                          variant={selectedIndustry === industry ? "default" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => setSelectedIndustry(industry)}
                        >
                          {industry}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 space-y-12">
              {isLoading ? (
                <div className="text-center py-12">Loading case studies...</div>
              ) : (
                <>
                  {/* Featured Case Study */}
                  {featuredStudy && (
                    <Link
                      to={`/${featuredStudy.slug}`}
                      className="block overflow-hidden group hover:scale-105 transform transition-all duration-300"
                    >
                      <div className="relative h-[500px]">
                        {/* Dark overlay for better readability */}
                        <div className="absolute inset-0 bg-gradient-to-b from-cyberdark/80 via-cyberdark/60 to-cyberdark/90 z-10" />
                        
                        {/* Background image */}
                        <img
                          src={featuredStudy.cover_image}
                          alt={featuredStudy.title}
                          className="absolute inset-0 w-full h-full object-cover object-top transform transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Content overlay */}
                        <div className="absolute inset-x-0 bottom-0 z-20 p-12 bg-gradient-to-t from-cyberdark via-cyberdark/95 to-transparent">
                          <Badge 
                            variant="outline" 
                            className="mb-6 px-4 py-2 text-lg bg-cyberdark/90 backdrop-blur-sm border-cyberpink text-cyberpink animate-pulse"
                          >
                            Featured Case Study
                          </Badge>

                          {/* Title and subtitle with enhanced contrast */}
                          <div className="bg-cyberdark/80 p-6 rounded-lg backdrop-blur-sm border border-white/10 mb-8">
                            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                              {featuredStudy.title}
                            </h2>
                            <p className="text-2xl text-gray-300">
                              {featuredStudy.subtitle}
                            </p>
                          </div>
                          
                          {/* Key Wins Grid with improved contrast */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-cyberdark/90 p-4 rounded-lg backdrop-blur-sm border border-cyberpink/20 hover:border-cyberpink/40 transition-colors">
                              <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="w-5 h-5 text-cyberpink" />
                                <span className="text-sm text-gray-300">Traffic Growth</span>
                              </div>
                              <p className="text-xl font-bold text-white">{featuredStudy.traffic_final}%</p>
                            </div>
                            <div className="bg-cyberdark/90 p-4 rounded-lg backdrop-blur-sm border border-cybercyan/20 hover:border-cybercyan/40 transition-colors">
                              <div className="flex items-center gap-2 mb-2">
                                <Users className="w-5 h-5 text-cybercyan" />
                                <span className="text-sm text-gray-300">Visitor Engagement</span>
                              </div>
                              <p className="text-xl font-bold text-white">{featuredStudy.unique_visitors}</p>
                            </div>
                            <div className="bg-cyberdark/90 p-4 rounded-lg backdrop-blur-sm border border-cyberamber/20 hover:border-cyberamber/40 transition-colors">
                              <div className="flex items-center gap-2 mb-2">
                                <Target className="w-5 h-5 text-cyberamber" />
                                <span className="text-sm text-gray-300">Lead Generation</span>
                              </div>
                              <p className="text-xl font-bold text-white">{featuredStudy.lead_generation}</p>
                            </div>
                            <div className="bg-cyberdark/90 p-4 rounded-lg backdrop-blur-sm border border-cyberblue/20 hover:border-cyberblue/40 transition-colors">
                              <div className="flex items-center gap-2 mb-2">
                                <PiggyBank className="w-5 h-5 text-cyberblue" />
                                <span className="text-sm text-gray-300">Budget Efficiency</span>
                              </div>
                              <p className="text-xl font-bold text-white">{featuredStudy.budget_efficiency}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )}

                  {/* Regular Case Studies Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {regularStudies?.map((study) => (
                      <Link
                        key={study.id}
                        to={`/${study.slug}`}
                        className="block glass-card overflow-hidden group hover:scale-105 transform transition-all duration-300"
                      >
                        <div className="relative h-48">
                          <img
                            src={study.cover_image}
                            alt={study.title}
                            className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-cyberdark to-transparent opacity-60" />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-white mb-2">{study.title}</h3>
                          <p className="text-gray-400">{study.subtitle}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CaseStudies;