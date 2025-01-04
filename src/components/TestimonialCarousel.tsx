import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Quote, Linkedin, ArrowUpRight } from "lucide-react";

const testimonials = [
  {
    text: "Tudor's ability to blend technical expertise with thoughtful leadership is inspiring. A systems builder at heart, he's always innovating, leading his team to success, and staying ahead of SEO and website trends. His consistently high leadership scores say it all.",
    author: "Solange Messier",
    role: "former colleague @Vendasta",
    linkedin: "https://www.linkedin.com/in/solange-messier/",
  },
  {
    text: "Tudor was a pivotal leader at Vendasta, driving website management and SEO strategy. He built a high-performing team of developers, SEO experts, and designers, consistently delivering innovative results. His servant leadership style fostered exceptional team engagement and satisfaction.",
    author: "Brittany Wong",
    role: "former manager @Vendasta",
    linkedin: "https://www.linkedin.com/in/brittanywong/",
  },
  {
    text: "Tudor is a rare SEO & Web Director who combines technical expertise, design acumen, and content strategy insight. He bridges technical SEO with broader marketing seamlessly, identifying pipeline issues and delivering clear, actionable solutions. His data-driven approach fosters trust, collaboration, and alignment with brand goals, making him a game-changer for any team.",
    author: "Brandon Moore",
    role: "former colleague @Vendasta",
    linkedin: "https://www.linkedin.com/in/brandon-moore-616b1336/",
  },
];

export const TestimonialCarousel = () => {
  return (
    <div className="w-full max-w-6xl mx-auto mt-20 px-4">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="relative"
      >
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index} className="md:basis-1/2">
              <div className="glass-card p-6 h-full flex flex-col gap-4">
                <Quote className="text-cyberpink w-8 h-8" />
                <p className="text-gray-300 flex-grow">{testimonial.text}</p>
                <div>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-cyberpink font-semibold">{testimonial.author}</p>
                    <a 
                      href={testimonial.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-cyberpink transition-colors inline-flex items-center gap-0.5"
                    >
                      <Linkedin className="w-4 h-4" />
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
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