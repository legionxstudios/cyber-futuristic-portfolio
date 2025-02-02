import { ImageUpload } from "../ImageUpload";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type HeroSectionProps = {
  heroImage?: string;
  mainHeading?: string;
  subHeading?: string;
  onImageUploaded: (url: string) => Promise<void>;
  onInputChange: (key: string, value: string) => void;
}

export const HeroSection = ({
  heroImage,
  mainHeading,
  subHeading,
  onImageUploaded,
  onInputChange,
}: HeroSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Hero Section</h3>
      <div className="space-y-4">
        <ImageUpload
          label="Hero Background Image"
          onImageUploaded={onImageUploaded}
        />
        {heroImage && (
          <img
            src={heroImage}
            alt="Hero background preview"
            className="mt-4 max-w-md rounded border border-cyberblue/20"
          />
        )}
        <div className="space-y-2">
          <Label htmlFor="main_heading">Main Heading</Label>
          <Input
            id="main_heading"
            value={mainHeading || ''}
            onChange={(e) => onInputChange('main_heading', e.target.value)}
            className="bg-cyberdark border-cyberblue/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sub_heading">Sub Heading</Label>
          <Input
            id="sub_heading"
            value={subHeading || ''}
            onChange={(e) => onInputChange('sub_heading', e.target.value)}
            className="bg-cyberdark border-cyberblue/20"
          />
        </div>
      </div>
    </div>
  );
};