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
  const { data: businessTypes = [] } = useQuery({
    queryKey: ["businessTypes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("business_types")
        .select("name")
        .order("name");
      if (error) throw error;
      // Transform the data to match the expected format
      return data?.map(type => ({ name: type.name })) || [];
    }
  });

  const { data: industries = [] } = useQuery({
    queryKey: ["industries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("industries")
        .select("name")
        .order("name");
      if (error) throw error;
      // Transform the data to match the expected format
      return data?.map(industry => ({ name: industry.name })) || [];
    }
  });

  const { data: channels = [] } = useQuery({
    queryKey: ["channels"],
    queryFn: async () => {
      console.log("Fetching channels...");
      const { data, error } = await supabase
        .from("channels")
        .select("name")
        .order("name");
      if (error) {
        console.error("Error fetching channels:", error);
        throw error;
      }
      console.log("Channels data:", data);
      // Transform the data to match the expected format
      const formattedChannels = data?.map(channel => ({ name: channel.name })) || [];
      console.log("Formatted channels:", formattedChannels);
      return formattedChannels;
    }
  });

  return (
    <>
      <BasicInfoFields 
        form={form} 
        businessTypes={businessTypes} 
        industries={industries} 
        channels={channels}
      />
      <ContentFields form={form} />
      <MetricsFields form={form} />
      <ImageFields form={form} />
    </>
  );
};