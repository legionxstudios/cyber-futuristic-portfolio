import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type SecondaryCTASectionProps = {
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
  onInputChange: (key: string, value: string) => void;
}

export const SecondaryCtaSection = ({
  ctaSecondaryText,
  ctaSecondaryLink,
  onInputChange,
}: SecondaryCTASectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Secondary CTA</h3>
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="cta_secondary_text">Secondary CTA Text</Label>
          <Input
            id="cta_secondary_text"
            value={ctaSecondaryText || ''}
            onChange={(e) => onInputChange('cta_secondary_text', e.target.value)}
            className="bg-cyberdark border-cyberblue/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cta_secondary_link">Secondary CTA Link</Label>
          <Input
            id="cta_secondary_link"
            value={ctaSecondaryLink || ''}
            onChange={(e) => onInputChange('cta_secondary_link', e.target.value)}
            className="bg-cyberdark border-cyberblue/20"
          />
        </div>
      </div>
    </div>
  );
};