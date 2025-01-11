import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Quote, Linkedin, ArrowUpRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const TestimonialCarousel = () => {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const isMobile = useIsMobile();

  const { data: testimonials, isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      console.log('Fetching testimonials...');
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) {
        console.error('Error fetching testimonials:', error);
        throw error;
      }
      
      console.log('Fetched testimonials:', data);
      return data;
    },
  });

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-[calc(100vw-2rem)] md:max-w-6xl mx-auto mt-20">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="relative"
        setApi={setApi}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {testimonials?.map((testimonial, index) => (
            <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2">
              <div className="glass-card p-4 md:p-6 h-full flex flex-col gap-4">
                <Quote className="text-cyberpink w-6 h-6 md:w-8 md:h-8" />
                <p className="text-gray-300 flex-grow text-sm md:text-base">{testimonial.quote}</p>
                <div>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-cyberpink font-semibold">{testimonial.author}</p>
                    {testimonial.linkedin_url && (
                      <a 
                        href={testimonial.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-cyberpink transition-colors inline-flex items-center gap-0.5"
                      >
                        <Linkedin className="w-4 h-4" />
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{testimonial.relationship}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {!isMobile && (
          <>
            <CarouselPrevious className="absolute -left-12 border border-cyberpink/20 hover:bg-cyberpink/20" />
            <CarouselNext className="absolute -right-12 border border-cyberpink/20 hover:bg-cyberpink/20" />
          </>
        )}

        {isMobile && testimonials && (
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  current === index ? "bg-cyberpink" : "bg-gray-600"
                }`}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
        )}
      </Carousel>
    </div>
  );
};