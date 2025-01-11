import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Linkedin, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  relationship: string;
  linkedin_url?: string | null;
}

interface SortableTestimonialItemProps {
  testimonial: Testimonial;
  onEdit: () => void;
  onDelete: () => void;
}

export const SortableTestimonialItem = ({ testimonial, onEdit, onDelete }: SortableTestimonialItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: testimonial.id });

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
            <p className="text-lg font-medium">{testimonial.author}</p>
            <p className="text-sm text-gray-400">{testimonial.relationship}</p>
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
      <p className="text-gray-300">{testimonial.quote}</p>
      {testimonial.linkedin_url && (
        <a
          href={testimonial.linkedin_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-cyberpink hover:text-cyberpink/80 mt-2 inline-flex items-center gap-0.5"
        >
          <Linkedin className="w-4 h-4" />
          <ArrowUpRight className="w-3 h-3" />
        </a>
      )}
    </div>
  );
};