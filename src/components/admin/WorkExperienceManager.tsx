import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkExperienceForm } from "./forms/WorkExperienceForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const WorkExperienceManager = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: experiences, refetch } = useQuery({
    queryKey: ["work_experience"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("work_experience")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("work_experience")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting work experience:", error);
      return;
    }

    refetch();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Work Experience</h2>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Experience" : "Add New Experience"}
              </DialogTitle>
            </DialogHeader>
            <WorkExperienceForm
              experienceId={editingId}
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
        {experiences?.map((experience) => (
          <div
            key={experience.id}
            className="p-4 bg-cyberdark border border-cyberblue/20 rounded-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-lg font-medium">{experience.company}</p>
                <p className="text-cyberpink">{experience.role}</p>
                <p className="text-sm text-gray-400">
                  {experience.date_range} | {experience.location}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingId(experience.id);
                    setIsFormOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(experience.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              {experience.description.map((item, index) => (
                <p key={index} className="text-gray-300">
                  • {item}
                </p>
              ))}
            </div>
            {experience.website && (
              <a
                href={experience.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cyberpink hover:text-cyberpink/80 mt-4 inline-block"
              >
                Company Website
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};