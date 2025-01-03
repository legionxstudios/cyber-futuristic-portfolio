import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Quote } from "lucide-react";

const testimonials = [
  {
    text: "One of the most innovative SEO professionals I've worked with. Their approach to technical SEO transformed our online presence.",
    author: "Sarah Chen",
    role: "CTO, TechCorp",
  },
  {
    text: "Their deep understanding of content strategy and user experience helped us achieve a 300% increase in organic traffic.",
    author: "Michael Rodriguez",
    role: "Marketing Director, GrowthCo",
  },
  {
    text: "A true expert in conversion rate optimization. They have a unique ability to turn data into actionable insights.",
    author: "Emily Watson",
    role: "Head of Digital, OptimizeNow",
  },
];

export const TestimonialCarousel = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-20 px-4">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="relative"
      >
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="glass-card p-6 h-full flex flex-col gap-4">
                <Quote className="text-cyberpink w-8 h-8" />
                <p className="text-gray-300 flex-grow">{testimonial.text}</p>
                <div>
                  <p className="text-cyberpink font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute -left-12 border border-cyberpink/20 hover:bg-cyberpink/20" />
        <CarouselNext className="absolute -right-12 border border-cyberpink/20 hover:bg-cyberpink/20" />
      </Carousel>
    </div>
  );
};