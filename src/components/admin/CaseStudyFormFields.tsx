import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { ImageUpload } from "./ImageUpload";

interface CaseStudyFormFieldsProps {
  form: UseFormReturn<any>;
}

export const CaseStudyFormFields = ({ form }: CaseStudyFormFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input {...field} className="bg-cyberdark border-cyberblue" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="subtitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Subtitle</FormLabel>
            <FormControl>
              <Input {...field} className="bg-cyberdark border-cyberblue" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="challenge"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Challenge (One item per line)</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                value={Array.isArray(field.value) ? field.value.join("\n") : field.value}
                onChange={(e) => field.onChange(e.target.value.split("\n"))}
                className="bg-cyberdark border-cyberblue min-h-[100px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="solution"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Solution (One item per line)</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                value={Array.isArray(field.value) ? field.value.join("\n") : field.value}
                onChange={(e) => {
                  const lines = e.target.value.split("\n");
                  field.onChange(lines);
                }}
                className="bg-cyberdark border-cyberblue min-h-[100px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="key_takeaways"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Key Takeaways (One item per line)</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                value={Array.isArray(field.value) ? field.value.join("\n") : field.value}
                onChange={(e) => {
                  const lines = e.target.value.split("\n");
                  field.onChange(lines);
                }}
                className="bg-cyberdark border-cyberblue min-h-[100px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="tools_used"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tools Used (One tool per line)</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                value={Array.isArray(field.value) ? field.value.join("\n") : field.value}
                onChange={(e) => {
                  const lines = e.target.value.split("\n");
                  field.onChange(lines);
                }}
                className="bg-cyberdark border-cyberblue min-h-[100px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="traffic_initial"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Initial Traffic</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  className="bg-cyberdark border-cyberblue"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="traffic_final"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Final Traffic</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  className="bg-cyberdark border-cyberblue"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="unique_visitors"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Unique Visitors</FormLabel>
            <FormControl>
              <Input {...field} className="bg-cyberdark border-cyberblue" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="lead_generation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Lead Generation</FormLabel>
            <FormControl>
              <Input {...field} className="bg-cyberdark border-cyberblue" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="budget_efficiency"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Budget Efficiency</FormLabel>
            <FormControl>
              <Input {...field} className="bg-cyberdark border-cyberblue" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

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