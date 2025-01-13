import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Target, PiggyBank } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tables } from "@/integrations/supabase/types";

type CaseStudy = Tables<"case_studies">;

interface CaseStudyCardProps {
  study: CaseStudy;
  isFeatured?: boolean;
}

const CaseStudyCard = ({ study, isFeatured = false }: CaseStudyCardProps) => {
  const isMobile = useIsMobile();
  
  const formatTraffic = (initial: number, final: number) => {
    return `${initial?.toLocaleString()} → ${final?.toLocaleString()}`;
  };

  // On mobile, or if not featured, show the simple card
  if (isMobile || !isFeatured) {
    return (
      <Link
        to={`/${study.slug}`}
        className="block glass-card overflow-hidden group hover:scale-105 transform transition-all duration-300"
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={study.cover_image}
            alt={study.title}
            className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cyberdark to-transparent opacity-60 transform transition-transform duration-500 group-hover:scale-110" />
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
      </Link>
    );
  }

  // Desktop featured card
  return (
    <Link
      to={`/${study.slug}`}
      className="block glass-card overflow-hidden group hover:scale-105 transform transition-all duration-300 md:col-span-2"
    >
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

        <div className="w-full md:w-1/2 relative overflow-hidden">
          <img
            src={study.cover_image}
            alt={study.title}
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cyberdark/80 via-transparent to-transparent transform transition-transform duration-500 group-hover:scale-110" />
        </div>
      </div>
    </Link>
  );
};

export default CaseStudyCard;