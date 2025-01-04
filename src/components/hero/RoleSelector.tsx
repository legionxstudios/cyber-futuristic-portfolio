import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RoleSelectorProps {
  selectedTitle: string;
  titles: string[];
  onSelect: (title: string) => void;
}

export const RoleSelector = ({ selectedTitle, titles, onSelect }: RoleSelectorProps) => {
  return (
    <div className="text-2xl md:text-3xl text-white flex items-center justify-center gap-2 flex-wrap">
      <span className="text-cybercyan font-medium">Director of</span>
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-glass backdrop-blur-sm border border-cyberpink/20 text-cyberpink hover:border-cyberpink/40 transition-colors">
          {selectedTitle}
          <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-cyberdark border border-cyberpink/20">
          {titles.map((title) => (
            <DropdownMenuItem
              key={title}
              onClick={() => onSelect(title)}
              className="text-white hover:text-cyberpink hover:bg-white/5 cursor-pointer"
            >
              {title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};