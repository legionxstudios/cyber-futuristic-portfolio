import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TestimonialForm } from "./forms/TestimonialForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const TestimonialsManager = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: testimonials, refetch } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting testimonial:", error);
      return;
    }

    refetch();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Testimonials</h2>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Testimonial" : "Add New Testimonial"}
              </DialogTitle>
            </DialogHeader>
            <TestimonialForm
              testimonialId={editingId}
              onSuccess={() => {
                setIsFormOpen(false);
                setEditingId(null);
                refetch();
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {testimonials?.map((testimonial) => (
          <div
            key={testimonial.id}
            className="p-4 bg-cyberdark border border-cyberblue/20 rounded-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-lg font-medium">{testimonial.author}</p>
                <p className="text-sm text-gray-400">{testimonial.relationship}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingId(testimonial.id);
                    setIsFormOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(testimonial.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
            <p className="text-gray-300">{testimonial.quote}</p>
            {testimonial.linkedin_url && (
              <a
                href={testimonial.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cyberpink hover:text-cyberpink/80 mt-2 inline-block"
              >
                LinkedIn Profile
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};