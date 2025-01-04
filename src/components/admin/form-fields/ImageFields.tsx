import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { ImageUpload } from "../ImageUpload";

interface ImageFieldsProps {
  form: UseFormReturn<any>;
}

export const ImageFields = ({ form }: ImageFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="cover_image"
        render={({ field }) => (
          <FormItem>
            <ImageUpload
              label="Cover Image"
              onImageUploaded={(url) => field.onChange(url)}
            />
            {field.value && (
              <img
                src={field.value}
                alt="Cover preview"
                className="mt-2 max-w-xs rounded"
              />
            )}
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="graph_image"
        render={({ field }) => (
          <FormItem>
            <ImageUpload
              label="Graph Image"
              onImageUploaded={(url) => field.onChange(url)}
            />
            {field.value && (
              <img
                src={field.value}
                alt="Graph preview"
                className="mt-2 max-w-xs rounded"
              />
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};