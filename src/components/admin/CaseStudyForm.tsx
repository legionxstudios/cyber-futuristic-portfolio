import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { CaseStudyFormFields } from "./CaseStudyFormFields";

interface CaseStudyFormProps {
  initialData?: any;
  onSuccess: () => void;
}

export const CaseStudyForm = ({ initialData, onSuccess }: CaseStudyFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: initialData || {
      title: "",
      subtitle: "",
      challenge: [],
      traffic_initial: "",
      traffic_final: "",
      unique_visitors: "",
      lead_generation: "",
      budget_efficiency: "",
      cover_image: "",
      graph_image: "",
    },
  });

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const { error } = initialData
        ? await supabase
            .from("case_studies")
            .update(values)
            .eq("id", initialData.id)
        : await supabase.from("case_studies").insert([values]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: `Case study ${initialData ? "updated" : "created"} successfully.`,
      });
      onSuccess();
    } catch (error: any) {
      console.error("Error saving case study:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CaseStudyFormFields form={form} />
        
        <Button
          type="submit"
          className="w-full bg-cyberpink hover:bg-cyberpink/80"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialData ? "Update" : "Create"} Case Study
        </Button>
      </form>
    </Form>
  );
};