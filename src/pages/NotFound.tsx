import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { TypeWriter } from "@/components/hero/TypeWriter";

const NotFound = () => {
  console.log("NotFound component rendering"); // Debug log

  const { data: settings, isLoading, error } = useQuery({
    queryKey: ["homepageSettings"],
    queryFn: async () => {
      console.log("Fetching homepage settings"); // Debug log
      const { data, error } = await supabase
        .from("homepage_settings")
        .select("*")
        .single();

      if (error) {
        console.error("Error fetching homepage settings:", error);
        throw error;
      }
      
      console.log("Fetched homepage settings:", data);
      return data;
    },
  });

  if (isLoading) {
    console.log("Loading state"); // Debug log
    return <div>Loading...</div>;
  }

  if (error) {
    console.log("Error state:", error); // Debug log
    return <div>Error loading page</div>;
  }

  const heroImageUrl = settings?.hero_image 
    ? settings.hero_image.replace(/\.png$/, '.webp')
    : '/lovable-uploads/7258cc15-bf02-4def-8f58-16354b60a865.webp';

  console.log("Using hero image:", heroImageUrl); // Debug log

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative bg-cyberdark text-white">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url('${heroImageUrl}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-cyberdark via-transparent to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-mono mb-8">
          <TypeWriter texts={[">_ Oops, you reached a 404"]} />
        </h1>
        
        <Link 
          to="/"
          className="inline-block px-8 py-3 rounded-lg bg-glass backdrop-blur-sm border border-white/10 text-white font-medium hover:bg-white/10 transition-colors hover:shadow-lg hover:shadow-white/20"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;