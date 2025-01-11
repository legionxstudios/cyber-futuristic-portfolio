import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CaseStudyForm } from "@/components/admin/CaseStudyForm";
import { CaseStudyList } from "@/components/admin/CaseStudyList";
import { HomepageSettings } from "@/components/admin/HomepageSettings";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminDashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data: caseStudies, refetch } = useQuery({
    queryKey: ["caseStudies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-cyberdark text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyberpink to-cybercyan">
            Admin Dashboard
          </h1>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button className="bg-cyberpink hover:bg-cyberpink/80">
                <Plus className="w-4 h-4 mr-2" />
                New Case Study
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-cyberdark border-cyberblue text-white max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Case Study</DialogTitle>
              </DialogHeader>
              <CaseStudyForm
                onSuccess={() => {
                  setIsFormOpen(false);
                  refetch();
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="case-studies" className="space-y-6">
          <TabsList className="bg-cyberdark border border-cyberblue/20">
            <TabsTrigger value="case-studies" className="data-[state=active]:bg-cyberpink">
              Case Studies
            </TabsTrigger>
            <TabsTrigger value="homepage" className="data-[state=active]:bg-cyberpink">
              Homepage
            </TabsTrigger>
          </TabsList>

          <TabsContent value="case-studies">
            <CaseStudyList caseStudies={caseStudies || []} onCaseStudyChange={refetch} />
          </TabsContent>

          <TabsContent value="homepage">
            <HomepageSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;