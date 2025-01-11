import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SkillForm } from "./forms/SkillForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

export const SkillsManager = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: skills, refetch } = useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("skills")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting skill:", error);
      return;
    }

    refetch();
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

      <div className="grid gap-4">
        {skills?.map((skill) => (
          <div
            key={skill.id}
            className="p-4 bg-cyberdark border border-cyberblue/20 rounded-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-lg font-medium">{skill.title}</p>
                <p className="text-sm text-gray-400">{skill.description}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingId(skill.id);
                    setIsFormOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(skill.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Proficiency</span>
                <span>{skill.proficiency}%</span>
              </div>
              <Progress value={skill.proficiency} className="h-2" />
            </div>
            {skill.focus && (
              <p className="text-sm text-gray-400 mt-2">{skill.focus}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};