import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { Filter, TrendingUp, Users, Target, PiggyBank } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CaseStudies = () => {
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedBusinessType, setSelectedBusinessType] = useState("All");
  const isMobile = useIsMobile();

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

  // Extract unique industries and business types from the data
  const { industries, businessTypes } = useMemo(() => {
    const uniqueIndustries = new Set(["All"]);
    const uniqueBusinessTypes = new Set(["All"]);

    caseStudies?.forEach(study => {
      if (study.industry) uniqueIndustries.add(study.industry);
      if (study.business_type) uniqueBusinessTypes.add(study.business_type);
    });

    return {
      industries: Array.from(uniqueIndustries),
      businessTypes: Array.from(uniqueBusinessTypes),
    };
  }, [caseStudies]);

  const featuredStudy = caseStudies?.find(study => study.is_featured);
  const regularStudies = caseStudies?.filter(study => !study.is_featured);

  const formatTraffic = (initial: number, final: number) => {
    return `${initial.toLocaleString()} → ${final.toLocaleString()}`;
  };

  const FiltersContent = () => (
    <>
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Business Type</h3>
          {isMobile ? (
            <Select value={selectedBusinessType} onValueChange={setSelectedBusinessType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select business type" />
              </SelectTrigger>
              <SelectContent>
                {businessTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="space-y-2">
              {businessTypes.map((type) => (
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
          )}
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Industry</h3>
          {isMobile ? (
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="space-y-2">
              {industries.map((industry) => (
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
          )}
        </div>
      </div>
    </>
  );

  const CaseStudyCard = ({ study, isFeatured = false }: { study: any, isFeatured?: boolean }) => (
    <Link
      to={`/${study.slug}`}
      className={`block glass-card overflow-hidden group hover:scale-105 transform transition-all duration-300 ${
        isFeatured && !isMobile ? 'md:col-span-2' : ''
      }`}
    >
      {isFeatured && !isMobile ? (
        <div className="flex flex-col md:flex-row bg-cyberdark/90 rounded-lg overflow-hidden">
          <div className="w-full md:w-1/2 p-8 space-y-6">
            <Badge 
              variant="outline" 
              className="px-4 py-2 text-lg border-cyberpink text-cyberpink animate-pulse"
            >
              Featured Case Study
            </Badge>

            <div className="space-y-4">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {study.title}
              </h2>
              <p className="text-xl text-gray-300">
                {study.subtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-cyberdark p-4 rounded-lg border border-cyberpink/20 hover:border-cyberpink/40 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-cyberpink" />
                  <span className="text-sm text-gray-300">Traffic Growth</span>
                </div>
                <p className="text-xl font-bold text-white">
                  {formatTraffic(study.traffic_initial || 0, study.traffic_final || 0)}
                </p>
              </div>
              <div className="bg-cyberdark p-4 rounded-lg border border-cybercyan/20 hover:border-cybercyan/40 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-cybercyan" />
                  <span className="text-sm text-gray-300">Visitor Engagement</span>
                </div>
                <p className="text-xl font-bold text-white">{study.unique_visitors}</p>
              </div>
              <div className="bg-cyberdark p-4 rounded-lg border border-cyberamber/20 hover:border-cyberamber/40 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-cyberamber" />
                  <span className="text-sm text-gray-300">Lead Generation</span>
                </div>
                <p className="text-xl font-bold text-white">{study.lead_generation}</p>
              </div>
              <div className="bg-cyberdark p-4 rounded-lg border border-cyberblue/20 hover:border-cyberblue/40 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <PiggyBank className="w-5 h-5 text-cyberblue" />
                  <span className="text-sm text-gray-300">Budget Efficiency</span>
                </div>
                <p className="text-xl font-bold text-white">{study.budget_efficiency}</p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 relative">
            <img
              src={study.cover_image}
              alt={study.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cyberdark/80 via-transparent to-transparent" />
          </div>
        </div>
      ) : (
        <>
          <div className="relative h-48">
            <img
              src={study.cover_image}
              alt={study.title}
              className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cyberdark to-transparent opacity-60" />
            {isFeatured && (
              <div className="absolute top-4 left-4">
                <Badge 
                  variant="outline" 
                  className="px-3 py-1 text-sm border-cyberpink text-cyberpink animate-pulse"
                >
                  Featured
                </Badge>
              </div>
            )}
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-white mb-2">{study.title}</h3>
            <p className="text-gray-400">{study.subtitle}</p>
          </div>
        </>
      )}
    </Link>
  );

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
          
          {/* Mobile Filters */}
          {isMobile && (
            <div className="mb-8">
              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                  <Filter className="w-5 h-5" />
                  Filters
                </h2>
                <FiltersContent />
              </div>
            </div>
          )}

          <div className="flex gap-8">
            {/* Desktop Filters Sidebar */}
            {!isMobile && (
              <aside className="w-64 space-y-8">
                <div className="glass-card p-6 space-y-6">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filters
                  </h2>
                  <FiltersContent />
                </div>
              </aside>
            )}

            {/* Main Content */}
            <div className="flex-1">
              {isLoading ? (
                <div className="text-center py-12">Loading case studies...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {featuredStudy && (
                    <CaseStudyCard study={featuredStudy} isFeatured={true} />
                  )}
                  {regularStudies?.map((study) => (
                    <CaseStudyCard key={study.id} study={study} />
                  ))}
                </div>
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