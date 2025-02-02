import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ImageUpload } from "./ImageUpload";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Save, Upload, FileText } from "lucide-react";

type HomepageSettings = {
  id: string;
  hero_image?: string;
  main_heading?: string;
  sub_heading?: string;
  cta_primary_text?: string;
  cta_primary_link?: string;
  cta_primary_file?: string;
  cta_secondary_text?: string;
  cta_secondary_link?: string;
  role_content?: Record<string, string>;
  cta_primary_new_tab?: boolean;
}

export const HomepageSettings = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState<Partial<HomepageSettings>>({});
  const { toast } = useToast();

  const { data: settings, refetch } = useQuery({
    queryKey: ["homepageSettings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("homepage_settings")
        .select("*")
        .single();

      if (error) throw error;
      
      const formattedData = {
        ...data,
        role_content: data.role_content as Record<string, string>
      };
      
      setFormData(formattedData);
      return formattedData as HomepageSettings;
    },
  });

  const handleImageUpload = async (url: string) => {
    try {
      setIsUpdating(true);
      const { error } = await supabase
        .from("homepage_settings")
        .update({ hero_image: url })
        .eq("id", settings?.id);

      if (error) throw error;

      await refetch();
      toast({
        title: "Success!",
        description: "Hero image updated successfully.",
      });
    } catch (error: any) {
      console.error("Error updating hero image:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

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
        .eq("id", settings?.id);

      if (updateError) throw updateError;

      await refetch();
      toast({
        title: "Success!",
        description: "PDF uploaded and linked successfully.",
      });

      // Update form data
      setFormData(prev => ({
        ...prev,
        cta_primary_file: publicUrl,
        cta_primary_link: publicUrl
      }));

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

  const handleInputChange = (
    key: keyof HomepageSettings,
    value: string | boolean
  ) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleRoleContentChange = (role: string, content: string) => {
    setFormData(prev => ({
      ...prev,
      role_content: {
        ...(prev.role_content || {}),
        [role]: content
      }
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsUpdating(true);
      const { error } = await supabase
        .from("homepage_settings")
        .update(formData)
        .eq("id", settings?.id);

      if (error) throw error;

      await refetch();
      toast({
        title: "Success!",
        description: "Settings updated successfully.",
      });
    } catch (error: any) {
      console.error("Error updating settings:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (!settings) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-cyberpink" />
      </div>
    );
  }

  return (
    <Card className="bg-cyberdark border-cyberblue">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white">Homepage Settings</CardTitle>
        <Button 
          onClick={handleSubmit} 
          disabled={isUpdating}
          className="bg-cyberpink hover:bg-cyberpink/80"
        >
          {isUpdating ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Save Changes
        </Button>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Hero Image Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Hero Image</h3>
          <ImageUpload
            label="Hero Background Image"
            onImageUploaded={handleImageUpload}
          />
          {settings.hero_image && (
            <img
              src={settings.hero_image}
              alt="Hero background preview"
              className="mt-4 max-w-md rounded border border-cyberblue/20"
            />
          )}
        </div>

        {/* PDF Upload Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Primary CTA PDF</h3>
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
                {formData.cta_primary_file && (
                  <a 
                    href={formData.cta_primary_file}
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
              <Label htmlFor="cta_primary_link">Primary CTA Link (PDF URL)</Label>
              <Input
                id="cta_primary_link"
                value={formData.cta_primary_link || ''}
                onChange={(e) => handleInputChange('cta_primary_link', e.target.value)}
                className="bg-cyberdark border-cyberblue/20"
                placeholder="Enter PDF URL manually or upload a file"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cta_primary_text">Primary CTA Text</Label>
              <Input
                id="cta_primary_text"
                value={formData.cta_primary_text || ''}
                onChange={(e) => handleInputChange('cta_primary_text', e.target.value)}
                className="bg-cyberdark border-cyberblue/20"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="cta_primary_new_tab"
                checked={formData.cta_primary_new_tab}
                onCheckedChange={(checked) => 
                  handleInputChange('cta_primary_new_tab', checked)
                }
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

        {/* Main Headings Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Main Headings</h3>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="main_heading">Main Heading</Label>
              <Input
                id="main_heading"
                value={formData.main_heading || ''}
                onChange={(e) => handleInputChange('main_heading', e.target.value)}
                className="bg-cyberdark border-cyberblue/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sub_heading">Sub Heading</Label>
              <Input
                id="sub_heading"
                value={formData.sub_heading || ''}
                onChange={(e) => handleInputChange('sub_heading', e.target.value)}
                className="bg-cyberdark border-cyberblue/20"
              />
            </div>
          </div>
        </div>

        {/* CTAs Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Call to Actions</h3>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="cta_primary_text">Primary CTA Text</Label>
              <Input
                id="cta_primary_text"
                value={formData.cta_primary_text || ''}
                onChange={(e) => handleInputChange('cta_primary_text', e.target.value)}
                className="bg-cyberdark border-cyberblue/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cta_secondary_text">Secondary CTA Text</Label>
              <Input
                id="cta_secondary_text"
                value={formData.cta_secondary_text || ''}
                onChange={(e) => handleInputChange('cta_secondary_text', e.target.value)}
                className="bg-cyberdark border-cyberblue/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cta_secondary_link">Secondary CTA Link</Label>
              <Input
                id="cta_secondary_link"
                value={formData.cta_secondary_link || ''}
                onChange={(e) => handleInputChange('cta_secondary_link', e.target.value)}
                className="bg-cyberdark border-cyberblue/20"
              />
            </div>
          </div>
        </div>

        {/* Role Content Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Role Descriptions</h3>
          <div className="grid gap-4">
            {settings.role_content && Object.entries(settings.role_content).map(([role, content]) => (
              <div key={role} className="space-y-2">
                <Label htmlFor={`role_${role}`}>{role} Role Description</Label>
                <Textarea
                  id={`role_${role}`}
                  value={formData.role_content?.[role] || content}
                  onChange={(e) => handleRoleContentChange(role, e.target.value)}
                  className="bg-cyberdark border-cyberblue/20 min-h-[100px]"
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};