import { Play } from "lucide-react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
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

  // Extract video ID from YouTube URL
  const getYouTubeId = (url: string) => {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : "";
  };

  const videoId = settings?.cta_primary_link ? getYouTubeId(settings.cta_primary_link) : "";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="group relative flex items-center gap-3 px-6 py-3 rounded-full bg-cyberpink text-white font-medium hover:bg-cyberpink/90 transition-all hover:shadow-lg hover:shadow-cyberpink/20">
          <div className="absolute inset-0 rounded-full bg-cyberpink blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
          <Play className="relative z-10" />
          <span className="relative z-10">{settings?.cta_primary_text || "Watch the #HireMeHuman movie"}</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl bg-cyberdark p-0 border-cyberpink/20">
        <div className="aspect-video">
          {videoId && (
            <LiteYouTubeEmbed 
              id={videoId}
              title="#HireMeHuman Movie"
              noCookie={true}
              params="autoplay=1&controls=1"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};