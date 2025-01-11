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

const skillSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  focus: z.string().optional(),
  proficiency: z.coerce
    .number()
    .min(0, "Proficiency must be at least 0")
    .max(100, "Proficiency must be at most 100"),
  icon: z.string().min(1, "Icon is required"),
});

type SkillFormValues = z.infer<typeof skillSchema>;

interface SkillFormProps {
  skillId?: string | null;
  onSuccess: () => void;
}

export const SkillForm = ({ skillId, onSuccess }: SkillFormProps) => {
  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      title: "",
      description: "",
      focus: "",
      proficiency: 0,
      icon: "",
    },
  });

  useEffect(() => {
    if (skillId) {
      const fetchSkill = async () => {
        const { data, error } = await supabase
          .from("skills")
          .select("*")
          .eq("id", skillId)
          .single();

        if (error) {
          console.error("Error fetching skill:", error);
          return;
        }

        if (data) {
          form.reset({
            title: data.title,
            description: data.description,
            focus: data.focus || "",
            proficiency: data.proficiency,
            icon: data.icon,
          });
        }
      };

      fetchSkill();
    }
  }, [skillId, form]);

  const onSubmit = async (values: SkillFormValues) => {
    const { focus, ...rest } = values;
    const skillData = {
      ...rest,
      focus: focus || null,
    };

    if (skillId) {
      const { error } = await supabase
        .from("skills")
        .update(skillData)
        .eq("id", skillId);

      if (error) {
        console.error("Error updating skill:", error);
        return;
      }
    } else {
      const { error } = await supabase
        .from("skills")
        .insert([skillData]);

      if (error) {
        console.error("Error creating skill:", error);
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="focus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Focus (optional)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="proficiency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proficiency (%)</FormLabel>
              <FormControl>
                <Input {...field} type="number" min="0" max="100" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g., Code2" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {skillId ? "Update" : "Create"} Skill
        </Button>
      </form>
    </Form>
  );
};