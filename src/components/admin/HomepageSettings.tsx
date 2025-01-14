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
import { Loader2 } from "lucide-react";

export const HomepageSettings = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const { data: settings, refetch } = useQuery({
    queryKey: ["homepageSettings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("homepage_settings")
        .select("*")
        .single();

      if (error) throw error;
      return data;
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

  const handleSettingUpdate = async (updates: Partial<typeof settings>) => {
    try {
      setIsUpdating(true);
      const { error } = await supabase
        .from("homepage_settings")
        .update(updates)
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

  const handleRoleContentUpdate = async (role: string, content: string) => {
    if (!settings?.role_content) return;
    
    const updatedContent = {
      ...settings.role_content,
      [role]: content,
    };

    await handleSettingUpdate({ role_content: updatedContent });
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
      <CardHeader>
        <CardTitle className="text-white">Homepage Settings</CardTitle>
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

        {/* Main Headings Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Main Headings</h3>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="main_heading">Main Heading</Label>
              <Input
                id="main_heading"
                value={settings.main_heading || ''}
                onChange={(e) => handleSettingUpdate({ main_heading: e.target.value })}
                className="bg-cyberdark border-cyberblue/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sub_heading">Sub Heading</Label>
              <Input
                id="sub_heading"
                value={settings.sub_heading || ''}
                onChange={(e) => handleSettingUpdate({ sub_heading: e.target.value })}
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
                value={settings.cta_primary_text || ''}
                onChange={(e) => handleSettingUpdate({ cta_primary_text: e.target.value })}
                className="bg-cyberdark border-cyberblue/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cta_primary_link">Primary CTA Link</Label>
              <Input
                id="cta_primary_link"
                value={settings.cta_primary_link || ''}
                onChange={(e) => handleSettingUpdate({ cta_primary_link: e.target.value })}
                className="bg-cyberdark border-cyberblue/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cta_secondary_text">Secondary CTA Text</Label>
              <Input
                id="cta_secondary_text"
                value={settings.cta_secondary_text || ''}
                onChange={(e) => handleSettingUpdate({ cta_secondary_text: e.target.value })}
                className="bg-cyberdark border-cyberblue/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cta_secondary_link">Secondary CTA Link</Label>
              <Input
                id="cta_secondary_link"
                value={settings.cta_secondary_link || ''}
                onChange={(e) => handleSettingUpdate({ cta_secondary_link: e.target.value })}
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
                  value={content}
                  onChange={(e) => handleRoleContentUpdate(role, e.target.value)}
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