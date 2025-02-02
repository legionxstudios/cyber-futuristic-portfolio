import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type RoleContentSectionProps = {
  roleContent?: Record<string, string>;
  onRoleContentChange: (role: string, content: string) => void;
}

export const RoleContentSection = ({
  roleContent,
  onRoleContentChange,
}: RoleContentSectionProps) => {
  if (!roleContent) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Role Descriptions</h3>
      <div className="grid gap-4">
        {Object.entries(roleContent).map(([role, content]) => (
          <div key={role} className="space-y-2">
            <Label htmlFor={`role_${role}`}>{role} Role Description</Label>
            <Textarea
              id={`role_${role}`}
              value={content}
              onChange={(e) => onRoleContentChange(role, e.target.value)}
              className="bg-cyberdark border-cyberblue/20 min-h-[100px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};