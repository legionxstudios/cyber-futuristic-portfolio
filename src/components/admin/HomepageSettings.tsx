import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { HeroSection } from "./homepage/HeroSection";
import { PrimaryCtaSection } from "./homepage/PrimaryCtaSection";
import { SecondaryCtaSection } from "./homepage/SecondaryCtaSection";
import { RoleContentSection } from "./homepage/RoleContentSection";

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
      console.log('Submitting form data:', formData);
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
        <HeroSection
          heroImage={formData.hero_image}
          mainHeading={formData.main_heading}
          subHeading={formData.sub_heading}
          onImageUploaded={handleImageUpload}
          onInputChange={handleInputChange}
        />

        <PrimaryCtaSection
          ctaPrimaryText={formData.cta_primary_text}
          ctaPrimaryLink={formData.cta_primary_link}
          ctaPrimaryFile={formData.cta_primary_file}
          ctaPrimaryNewTab={formData.cta_primary_new_tab}
          settingsId={settings.id}
          onInputChange={handleInputChange}
          refetch={refetch}
        />

        <SecondaryCtaSection
          ctaSecondaryText={formData.cta_secondary_text}
          ctaSecondaryLink={formData.cta_secondary_link}
          onInputChange={handleInputChange}
        />

        <RoleContentSection
          roleContent={formData.role_content}
          onRoleContentChange={handleRoleContentChange}
        />
      </CardContent>
    </Card>
  );
};