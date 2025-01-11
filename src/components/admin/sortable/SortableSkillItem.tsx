import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { Skill } from "@/components/Skills";

interface SortableSkillItemProps {
  skill: Skill;
  onEdit: () => void;
  onDelete: () => void;
}

export const SortableSkillItem = ({ skill, onEdit, onDelete }: SortableSkillItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: skill.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-4 bg-cyberdark border border-cyberblue/20 rounded-lg"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1 hover:bg-white/5 rounded"
          >
            <GripVertical className="w-5 h-5 text-gray-400" />
          </button>
          <div>
            <p className="text-lg font-medium">{skill.title}</p>
            <p className="text-sm text-gray-400">{skill.description}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={onDelete}
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
  );
};