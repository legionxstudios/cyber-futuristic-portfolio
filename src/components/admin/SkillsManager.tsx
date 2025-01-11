import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SkillForm } from "./forms/SkillForm";
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
import { SortableSkillItem } from "./sortable/SortableSkillItem";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

export const SkillsManager = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: skills, refetch } = useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("skills")
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
      .from("skills")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting skill:", error);
      toast({
        title: "Error",
        description: "Failed to delete skill",
        variant: "destructive",
      });
      return;
    }

    refetch();
    toast({
      title: "Success",
      description: "Skill deleted successfully",
    });
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    
    if (!active || !over || active.id === over.id) {
      return;
    }

    const oldIndex = skills?.findIndex((skill) => skill.id === active.id);
    const newIndex = skills?.findIndex((skill) => skill.id === over.id);

    if (oldIndex === undefined || newIndex === undefined || !skills) {
      return;
    }

    const newSkills = arrayMove(skills, oldIndex, newIndex);
    
    // Update display order in database
    const updates = newSkills.map((skill, index) => ({
      id: skill.id,
      display_order: index,
    }));

    const { error } = await supabase
      .from('skills')
      .upsert(updates);

    if (error) {
      console.error('Error updating skill order:', error);
      toast({
        title: "Error",
        description: "Failed to update skill order",
        variant: "destructive",
      });
      return;
    }

    refetch();
    toast({
      title: "Success",
      description: "Skill order updated successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Technical Arsenal</h2>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Skill" : "Add New Skill"}
              </DialogTitle>
            </DialogHeader>
            <SkillForm
              skillId={editingId}
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
          items={skills || []}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid gap-4">
            {skills?.map((skill) => (
              <SortableSkillItem
                key={skill.id}
                skill={skill}
                onEdit={() => {
                  setEditingId(skill.id);
                  setIsFormOpen(true);
                }}
                onDelete={() => handleDelete(skill.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};