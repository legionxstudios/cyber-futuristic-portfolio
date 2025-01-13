import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import CaseStudyCard from "@/components/case-studies/CaseStudyCard";
import CaseStudyFilters from "@/components/case-studies/CaseStudyFilters";

const CaseStudies = () => {
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedBusinessType, setSelectedBusinessType] = useState("All");
  const [selectedChannel, setSelectedChannel] = useState("All");
  const isMobile = useIsMobile();

  // Fetch case studies with filters
  const { data: caseStudies, isLoading } = useQuery({
    queryKey: ["case-studies", selectedIndustry, selectedBusinessType, selectedChannel],
    queryFn: async () => {
      console.log("Fetching case studies with filters:", { selectedIndustry, selectedBusinessType, selectedChannel });
      let query = supabase
        .from("case_studies")
        .select("*")
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (selectedIndustry !== "All") {
        query = query.eq("industry", selectedIndustry);
      }
      if (selectedBusinessType !== "All") {
        query = query.eq("business_type", selectedBusinessType);
      }
      if (selectedChannel !== "All") {
        query = query.eq("channel", selectedChannel);
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

  // Get unique active channels from case studies
  const activeChannels = useMemo(() => {
    if (!caseStudies) return ["All"];
    const channels = new Set(caseStudies.map(study => study.channel).filter(Boolean));
    return ["All", ...Array.from(channels)];
  }, [caseStudies]);

  // Fetch all available filters
  const { data: businessTypes } = useQuery({
    queryKey: ["business-types"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("business_types")
        .select("name")
        .order("name");
      if (error) throw error;
      return ["All", ...(data?.map(type => type.name) || [])];
    },
  });

  const { data: industries } = useQuery({
    queryKey: ["industries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("industries")
        .select("name")
        .order("name");
      if (error) throw error;
      return ["All", ...(data?.map(industry => industry.name) || [])];
    },
  });

  const { data: channels } = useQuery({
    queryKey: ["channels"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("channels")
        .select("name")
        .order("name");
      if (error) throw error;
      return ["All", ...(data?.map(channel => channel.name) || [])];
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
          
          {/* Mobile Filters */}
          {isMobile && (
            <CaseStudyFilters
              selectedIndustry={selectedIndustry}
              setSelectedIndustry={setSelectedIndustry}
              selectedBusinessType={selectedBusinessType}
              setSelectedBusinessType={setSelectedBusinessType}
              selectedChannel={selectedChannel}
              setSelectedChannel={setSelectedChannel}
              industries={industries || []}
              businessTypes={businessTypes || []}
              channels={channels || []}
              activeChannels={activeChannels}
            />
          )}

          <div className="flex gap-8">
            {/* Desktop Filters Sidebar */}
            {!isMobile && (
              <CaseStudyFilters
                selectedIndustry={selectedIndustry}
                setSelectedIndustry={setSelectedIndustry}
                selectedBusinessType={selectedBusinessType}
                setSelectedBusinessType={setSelectedBusinessType}
                selectedChannel={selectedChannel}
                setSelectedChannel={setSelectedChannel}
                industries={industries || []}
                businessTypes={businessTypes || []}
                channels={channels || []}
                activeChannels={activeChannels}
              />
            )}

            {/* Main Content */}
            <div className="flex-1">
              {isLoading ? (
                <div className="text-center py-12">Loading case studies...</div>
              ) : caseStudies?.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  No case studies found matching your filters.
                </div>
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