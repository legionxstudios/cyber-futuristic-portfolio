import { UseFormReturn } from "react-hook-form";
import { BasicInfoFields } from "./form-fields/BasicInfoFields";
import { ContentFields } from "./form-fields/ContentFields";
import { MetricsFields } from "./form-fields/MetricsFields";
import { ImageFields } from "./form-fields/ImageFields";

interface CaseStudyFormFieldsProps {
  form: UseFormReturn<any>;
}

export const CaseStudyFormFields = ({ form }: CaseStudyFormFieldsProps) => {
  return (
    <>
      <BasicInfoFields form={form} />
      <ContentFields form={form} />
      <MetricsFields form={form} />
      <ImageFields form={form} />
    </>
  );
};