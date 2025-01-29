import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from 'react-helmet-async';
import { supabase } from "@/integrations/supabase/client";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import ResultsOverview from "@/components/case-study/ResultsOverview";
import MainContent from "@/components/case-study/MainContent";
import ToolsSection from "@/components/case-study/ToolsSection";
import { TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { InlineWidget } from "react-calendly";
import { Tables } from "@/integrations/supabase/types";

type CaseStudy = Tables<"case_studies">;

const CaseStudy = () => {
  const { slug } = useParams();
  
  const { data: caseStudy, isLoading, error } = useQuery({
    queryKey: ['case-study', slug],
    queryFn: async () => {
      console.log('Fetching case study for slug:', slug);
      if (!slug) {
        console.error('No slug provided');
        return null;
      }

      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching case study:', error);
        throw error;
      }
      
      console.log('Fetched case study:', data);
      return data;
    },
    enabled: !!slug, // Only run query if slug exists
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // If no slug is provided, redirect to case studies page
  if (!slug) {
    return <Navigate to="/case-studies" replace />;
  }

  if (isLoading) {
    return <div className="min-h-screen bg-cyberdark text-white flex items-center justify-center">
      Loading...
    </div>;
  }

  if (error || !caseStudy) {
    return <Navigate to="/404" replace />;
  }

  const metaDescription = `${caseStudy.subtitle || ''} Learn how we achieved ${caseStudy.traffic_final?.toLocaleString()} monthly visits and ${caseStudy.lead_generation} leads for ${caseStudy.client}.`;

  return (
    <>
      <Helmet>
        <title>{`${caseStudy.title} | Case Study`}</title>
        <meta name="description" content={metaDescription} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${caseStudy.title} | Case Study`} />
        <meta property="og:description" content={metaDescription} />
        {caseStudy.cover_image && <meta property="og:image" content={caseStudy.cover_image} />}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${caseStudy.title} | Case Study`} />
        <meta name="twitter:description" content={metaDescription} />
        {caseStudy.cover_image && <meta name="twitter:image" content={caseStudy.cover_image} />}
      </Helmet>

      <div className="min-h-screen bg-cyberdark text-white pb-20">
        <CaseStudyHero caseStudy={caseStudy} />
        <ResultsOverview caseStudy={caseStudy} />
        <MainContent caseStudy={caseStudy} />
        
        {/* Results Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-cyberpink" />
                <h2 className="text-2xl font-bold">Results & Impact</h2>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-white/5 p-4 rounded-lg">
                      <h3 className="text-xl font-semibold text-cyberpink mb-2">{caseStudy.traffic_heading}</h3>
                      <p className="text-gray-300">
                        {caseStudy.traffic_initial?.toLocaleString()} → {caseStudy.traffic_final?.toLocaleString()} monthly visits
                      </p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg">
                      <h3 className="text-xl font-semibold text-cybercyan mb-2">{caseStudy.leads_heading}</h3>
                      <p className="text-gray-300">{caseStudy.lead_generation}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white/5 p-4 rounded-lg">
                      <h3 className="text-xl font-semibold text-cyberamber mb-2">{caseStudy.visitors_heading}</h3>
                      <p className="text-gray-300">{caseStudy.unique_visitors}</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg">
                      <h3 className="text-xl font-semibold text-cyberpink mb-2">{caseStudy.budget_heading}</h3>
                      <p className="text-gray-300">{caseStudy.budget_efficiency}</p>
                    </div>
                  </div>
                </div>
                {caseStudy.graph_image && (
                  <div className="w-full h-[400px] relative rounded-lg overflow-hidden">
                    <img 
                      src={caseStudy.graph_image}
                      alt={`Traffic growth graph for ${caseStudy.title}`}
                      className="w-full h-full object-contain bg-white/5"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <ToolsSection tools={Array.isArray(caseStudy.tools_used) ? caseStudy.tools_used : []} />

        {/* Pre-footer CTA Section */}
        <section className="py-16 relative">
          <div className="container mx-auto px-4">
            <div className="glass-card p-8">
              <div className="text-center space-y-6 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyberpink to-cybercyan">
                    Ready to Achieve Similar Results?
                  </span>
                </h2>
                <p className="text-lg text-gray-300">
                  Transform your organization's digital presence with data-driven strategies that deliver measurable results. Let's discuss how we can help you reach your goals.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="bg-cyberpink hover:bg-cyberpink/80 text-white"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule a Call
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] h-[80vh]">
                    <InlineWidget url="https://calendly.com/meetwithtudor/30min" styles={{ height: '100%' }} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CaseStudy;