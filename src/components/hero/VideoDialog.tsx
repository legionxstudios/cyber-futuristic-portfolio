import { Play } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

export const VideoDialog = () => {
  const { data: settings } = useQuery({
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

  // Convert YouTube URL to embed format
  const getEmbedUrl = (url: string | null | undefined) => {
    if (!url) return '';
    
    // Handle different YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    
    return url; // Return original URL if not a YouTube URL
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="group relative flex items-center gap-3 px-6 py-3 rounded-full bg-cyberpink text-white font-medium hover:bg-cyberpink/90 transition-all hover:shadow-lg hover:shadow-cyberpink/20">
          <div className="absolute inset-0 rounded-full bg-cyberpink blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
          <Play className="relative z-10" />
          <span className="relative z-10">{settings?.cta_primary_text || "Watch the #HireMeHuman movie"}</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl bg-cyberdark p-0 border-cyberpink/20">
        <div className="aspect-video w-full">
          <iframe
            src={getEmbedUrl(settings?.cta_primary_link)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};