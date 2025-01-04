import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";

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
              <FormLabel>Challenge</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={Array.isArray(field.value) ? field.value.join("\n") : field.value}
                  onChange={(e) => field.onChange(e.target.value.split("\n"))}
                  className="bg-cyberdark border-cyberblue"
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