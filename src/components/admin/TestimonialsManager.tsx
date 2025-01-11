import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TestimonialForm } from "./forms/TestimonialForm";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableTestimonialItem } from "./sortable/SortableTestimonialItem";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

export const TestimonialsManager = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: testimonials, refetch } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting testimonial:", error);
      toast({
        title: "Error",
        description: "Failed to delete testimonial",
        variant: "destructive",
      });
      return;
    }

    refetch();
    toast({
      title: "Success",
      description: "Testimonial deleted successfully",
    });
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    
    if (!active || !over || active.id === over.id) {
      return;
    }

    const oldIndex = testimonials?.findIndex((testimonial) => testimonial.id === active.id);
    const newIndex = testimonials?.findIndex((testimonial) => testimonial.id === over.id);

    if (oldIndex === undefined || newIndex === undefined || !testimonials) {
      return;
    }

    const newTestimonials = arrayMove(testimonials, oldIndex, newIndex);
    
    // Update display order in database
    const updates = newTestimonials.map((testimonial, index) => ({
      id: testimonial.id,
      display_order: index,
    }));

    const { error } = await supabase
      .from('testimonials')
      .upsert(updates);

    if (error) {
      console.error('Error updating testimonial order:', error);
      toast({
        title: "Error",
        description: "Failed to update testimonial order",
        variant: "destructive",
      });
      return;
    }

    refetch();
    toast({
      title: "Success",
      description: "Testimonial order updated successfully",
    });
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

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={testimonials || []}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid gap-4">
            {testimonials?.map((testimonial) => (
              <SortableTestimonialItem
                key={testimonial.id}
                testimonial={testimonial}
                onEdit={() => {
                  setEditingId(testimonial.id);
                  setIsFormOpen(true);
                }}
                onDelete={() => handleDelete(testimonial.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};