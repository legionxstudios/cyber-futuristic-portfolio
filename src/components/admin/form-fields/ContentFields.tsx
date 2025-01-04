import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

interface ContentFieldsProps {
  form: UseFormReturn<any>;
}

export const ContentFields = ({ form }: ContentFieldsProps) => {
  return (
    <>
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
        name="key_takeaways"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Key Takeaways (One item per line)</FormLabel>
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
        name="tools_used"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tools Used (One tool per line)</FormLabel>
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
    </>
  );
};