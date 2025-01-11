import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const workExperienceSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Role is required"),
  date_range: z.string().min(1, "Date range is required"),
  location: z.string().min(1, "Location is required"),
  website: z.string().url().optional().or(z.literal("")),
  description: z.string().min(1, "Description is required"),
});

type WorkExperienceFormValues = z.infer<typeof workExperienceSchema>;

interface WorkExperienceFormProps {
  experienceId?: string | null;
  onSuccess: () => void;
}

export const WorkExperienceForm = ({ experienceId, onSuccess }: WorkExperienceFormProps) => {
  const form = useForm<WorkExperienceFormValues>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      company: "",
      role: "",
      date_range: "",
      location: "",
      website: "",
      description: "",
    },
  });

  useEffect(() => {
    if (experienceId) {
      const fetchExperience = async () => {
        const { data, error } = await supabase
          .from("work_experience")
          .select("*")
          .eq("id", experienceId)
          .single();

        if (error) {
          console.error("Error fetching work experience:", error);
          return;
        }

        if (data) {
          form.reset({
            company: data.company,
            role: data.role,
            date_range: data.date_range,
            location: data.location,
            website: data.website || "",
            description: data.description.join("\n"),
          });
        }
      };

      fetchExperience();
    }
  }, [experienceId, form]);

  const onSubmit = async (values: WorkExperienceFormValues) => {
    const { website, description, ...rest } = values;
    const experienceData = {
      ...rest,
      website: website || null,
      description: description.split("\n").filter(Boolean),
    };

    if (experienceId) {
      const { error } = await supabase
        .from("work_experience")
        .update(experienceData)
        .eq("id", experienceId);

      if (error) {
        console.error("Error updating work experience:", error);
        return;
      }
    } else {
      const { error } = await supabase
        .from("work_experience")
        .insert([experienceData]);

      if (error) {
        console.error("Error creating work experience:", error);
        return;
      }
    }

    onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date_range"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date Range</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g., Jan 2020 - Present" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website URL (optional)</FormLabel>
              <FormControl>
                <Input {...field} type="url" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (one point per line)</FormLabel>
              <FormControl>
                <Textarea {...field} rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {experienceId ? "Update" : "Create"} Experience
        </Button>
      </form>
    </Form>
  );
};