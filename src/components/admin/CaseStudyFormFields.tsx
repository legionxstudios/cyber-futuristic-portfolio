import { UseFormReturn } from "react-hook-form";
import { BasicInfoFields } from "./form-fields/BasicInfoFields";
import { ContentFields } from "./form-fields/ContentFields";
import { MetricsFields } from "./form-fields/MetricsFields";
import { ImageFields } from "./form-fields/ImageFields";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface CaseStudyFormFieldsProps {
  form: UseFormReturn<any>;
}

export const CaseStudyFormFields = ({ form }: CaseStudyFormFieldsProps) => {
  const { data: businessTypes } = useQuery({
    queryKey: ["businessTypes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("business_types")
        .select("name")
        .order("name");
      if (error) throw error;
      return data.map(type => type.name);
    }
  });

  const { data: industries } = useQuery({
    queryKey: ["industries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("industries")
        .select("name")
        .order("name");
      if (error) throw error;
      return data.map(industry => industry.name);
    }
  });

  return (
    <>
      <BasicInfoFields 
        form={form} 
        businessTypes={businessTypes || []} 
        industries={industries || []} 
      />
      <ContentFields form={form} />
      <MetricsFields form={form} />
      <ImageFields form={form} />
    </>
  );
};