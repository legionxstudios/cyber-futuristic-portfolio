import { Play } from "lucide-react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

export const VideoDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="group relative flex items-center gap-3 px-6 py-3 rounded-full bg-cyberpink text-white font-medium hover:bg-cyberpink/90 transition-all hover:shadow-lg hover:shadow-cyberpink/20">
          <div className="absolute inset-0 rounded-full bg-cyberpink blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
          <Play className="relative z-10" />
          <span className="relative z-10">Watch the #HireMeHuman movie</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl bg-cyberdark p-0 border-cyberpink/20">
        <div className="aspect-video">
          <LiteYouTubeEmbed 
            id="dQw4w9WgXcQ"
            title="#HireMeHuman Movie"
            poster="maxresdefault"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};