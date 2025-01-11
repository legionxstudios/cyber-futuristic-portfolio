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

const testimonialSchema = z.object({
  quote: z.string().min(1, "Quote is required"),
  author: z.string().min(1, "Author name is required"),
  linkedin_url: z.string().url().optional().or(z.literal("")),
  relationship: z.string().min(1, "Relationship is required"),
});

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

interface TestimonialFormProps {
  testimonialId?: string | null;
  onSuccess: () => void;
}

export const TestimonialForm = ({ testimonialId, onSuccess }: TestimonialFormProps) => {
  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      quote: "",
      author: "",
      linkedin_url: "",
      relationship: "",
    },
  });

  useEffect(() => {
    if (testimonialId) {
      const fetchTestimonial = async () => {
        const { data, error } = await supabase
          .from("testimonials")
          .select("*")
          .eq("id", testimonialId)
          .single();

        if (error) {
          console.error("Error fetching testimonial:", error);
          return;
        }

        if (data) {
          form.reset({
            quote: data.quote,
            author: data.author,
            linkedin_url: data.linkedin_url || "",
            relationship: data.relationship,
          });
        }
      };

      fetchTestimonial();
    }
  }, [testimonialId, form]);

  const onSubmit = async (values: TestimonialFormValues) => {
    const testimonialData = {
      quote: values.quote,
      author: values.author,
      linkedin_url: values.linkedin_url || null,
      relationship: values.relationship,
    };

    if (testimonialId) {
      const { error } = await supabase
        .from("testimonials")
        .update(testimonialData)
        .eq("id", testimonialId);

      if (error) {
        console.error("Error updating testimonial:", error);
        return;
      }
    } else {
      const { error } = await supabase
        .from("testimonials")
        .insert([testimonialData]);

      if (error) {
        console.error("Error creating testimonial:", error);
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
          name="quote"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quote</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkedin_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn URL (optional)</FormLabel>
              <FormControl>
                <Input {...field} type="url" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="relationship"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Relationship</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g., Former colleague" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {testimonialId ? "Update" : "Create"} Testimonial
        </Button>
      </form>
    </Form>
  );
};