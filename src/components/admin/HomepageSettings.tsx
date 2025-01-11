import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ImageUpload } from "./ImageUpload";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <CardContent className="space-y-4">
        <div className="space-y-4">
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
      </CardContent>
    </Card>
  );
};