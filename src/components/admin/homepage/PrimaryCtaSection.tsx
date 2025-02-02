import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Upload, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

type PrimaryCtaSectionProps = {
  ctaPrimaryText?: string;
  ctaPrimaryLink?: string;
  ctaPrimaryFile?: string;
  ctaPrimaryNewTab?: boolean;
  settingsId: string;
  onInputChange: (key: string, value: string | boolean) => void;
  refetch: () => Promise<any>;
}

export const PrimaryCtaSection = ({
  ctaPrimaryText,
  ctaPrimaryLink,
  ctaPrimaryFile,
  ctaPrimaryNewTab,
  settingsId,
  onInputChange,
  refetch
}: PrimaryCtaSectionProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handlePdfUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      if (file.type !== 'application/pdf') {
        toast({
          title: "Error",
          description: "Please upload a PDF file",
          variant: "destructive",
        });
        return;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `pdfs/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('homepage-files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('homepage-files')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from("homepage_settings")
        .update({ 
          cta_primary_file: publicUrl,
          cta_primary_link: publicUrl 
        })
        .eq("id", settingsId);

      if (updateError) throw updateError;

      await refetch();
      toast({
        title: "Success!",
        description: "PDF uploaded and linked successfully.",
      });

      onInputChange('cta_primary_file', publicUrl);
      onInputChange('cta_primary_link', publicUrl);

    } catch (error: any) {
      console.error("Error uploading PDF:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Primary CTA</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pdf-upload">Upload PDF File</Label>
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              className="bg-cyberdark border-cyberblue"
              disabled={isUploading}
            >
              <label className="cursor-pointer flex items-center">
                {isUploading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="mr-2 h-4 w-4" />
                )}
                Upload PDF
                <input
                  id="pdf-upload"
                  type="file"
                  className="hidden"
                  accept="application/pdf"
                  onChange={handlePdfUpload}
                  disabled={isUploading}
                />
              </label>
            </Button>
            {ctaPrimaryFile && (
              <a 
                href={ctaPrimaryFile}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-cyberpink hover:text-cyberpink/80"
              >
                <FileText className="h-4 w-4" />
                View Current PDF
              </a>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cta_primary_link">Primary CTA Link</Label>
          <Input
            id="cta_primary_link"
            value={ctaPrimaryLink || ''}
            onChange={(e) => onInputChange('cta_primary_link', e.target.value)}
            className="bg-cyberdark border-cyberblue/20"
            placeholder="Enter URL or upload a PDF"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cta_primary_text">Primary CTA Text</Label>
          <Input
            id="cta_primary_text"
            value={ctaPrimaryText || ''}
            onChange={(e) => onInputChange('cta_primary_text', e.target.value)}
            className="bg-cyberdark border-cyberblue/20"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="cta_primary_new_tab"
            checked={ctaPrimaryNewTab}
            onCheckedChange={(checked) => 
              onInputChange('cta_primary_new_tab', checked as boolean)
            }
            className="data-[state=checked]:bg-cyberpink data-[state=checked]:border-cyberpink"
          />
          <Label 
            htmlFor="cta_primary_new_tab"
            className="text-sm text-gray-300"
          >
            Open link in new tab
          </Label>
        </div>
      </div>
    </div>
  );
};