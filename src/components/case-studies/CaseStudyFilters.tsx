import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";

interface CaseStudyFiltersProps {
  selectedIndustry: string;
  setSelectedIndustry: (value: string) => void;
  selectedBusinessType: string;
  setSelectedBusinessType: (value: string) => void;
  selectedChannel: string;
  setSelectedChannel: (value: string) => void;
  industries: string[];
  businessTypes: string[];
  channels: string[];
}

const CaseStudyFilters = ({
  selectedIndustry,
  setSelectedIndustry,
  selectedBusinessType,
  setSelectedBusinessType,
  selectedChannel,
  setSelectedChannel,
  industries,
  businessTypes,
  channels,
}: CaseStudyFiltersProps) => {
  const isMobile = useIsMobile();

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

        <div>
          <h3 className="text-sm font-medium mb-2">Channel</h3>
          {isMobile ? (
            <Select value={selectedChannel} onValueChange={setSelectedChannel}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select channel" />
              </SelectTrigger>
              <SelectContent>
                {channels.map((channel) => (
                  <SelectItem key={channel} value={channel}>
                    {channel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="space-y-2">
              {channels.map((channel) => (
                <Button
                  key={channel}
                  variant={selectedChannel === channel ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedChannel(channel)}
                >
                  {channel}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <div className="mb-8">
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5" />
            Filters
          </h2>
          <FiltersContent />
        </div>
      </div>
    );
  }

  return (
    <aside className="w-64 space-y-8">
      <div className="glass-card p-6 space-y-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </h2>
        <FiltersContent />
      </div>
    </aside>
  );
};

export default CaseStudyFilters;