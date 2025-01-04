import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { CaseStudyForm } from "./CaseStudyForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CaseStudyListProps {
  caseStudies: any[];
  onCaseStudyChange: () => void;
}

export const CaseStudyList = ({
  caseStudies,
  onCaseStudyChange,
}: CaseStudyListProps) => {
  const [editingCaseStudy, setEditingCaseStudy] = useState<any>(null);
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("case_studies").delete().eq("id", id);
      if (error) throw error;

      toast({
        title: "Success!",
        description: "Case study deleted successfully.",
      });
      onCaseStudyChange();
    } catch (error: any) {
      console.error("Error deleting case study:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {caseStudies.map((caseStudy) => (
        <div
          key={caseStudy.id}
          className="glass-card p-6 rounded-lg space-y-4"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-cyberpink">
                {caseStudy.title}
              </h3>
              <p className="text-gray-400">{caseStudy.subtitle}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setEditingCaseStudy(caseStudy)}
                className="hover:text-cybercyan hover:border-cybercyan"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDelete(caseStudy.id)}
                className="hover:text-red-500 hover:border-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-cybercyan">Traffic Growth:</span>
              <p className="text-gray-300">
                {caseStudy.traffic_initial} → {caseStudy.traffic_final}
              </p>
            </div>
            <div>
              <span className="text-cybercyan">Unique Visitors:</span>
              <p className="text-gray-300">{caseStudy.unique_visitors}</p>
            </div>
            <div>
              <span className="text-cybercyan">Lead Generation:</span>
              <p className="text-gray-300">{caseStudy.lead_generation}</p>
            </div>
          </div>
        </div>
      ))}

      <Dialog
        open={!!editingCaseStudy}
        onOpenChange={(open) => !open && setEditingCaseStudy(null)}
      >
        <DialogContent className="bg-cyberdark border-cyberblue text-white max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Case Study</DialogTitle>
          </DialogHeader>
          {editingCaseStudy && (
            <CaseStudyForm
              initialData={editingCaseStudy}
              onSuccess={() => {
                setEditingCaseStudy(null);
                onCaseStudyChange();
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};