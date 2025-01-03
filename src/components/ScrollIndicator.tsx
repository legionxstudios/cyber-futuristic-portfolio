import { useEffect, useState } from "react";

export const ScrollIndicator = () => {
  const [activeSection, setActiveSection] = useState(0);
  const sections = ["Hero", "Skills", "Experience", "Projects", "Contact"];

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section => 
        document.getElementById(section.toLowerCase())
      );
      
      const currentPosition = window.scrollY + window.innerHeight / 3;
      
      sectionElements.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          if (currentPosition >= sectionTop && currentPosition < sectionBottom) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const section = document.getElementById(sections[index].toLowerCase());
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {sections.map((section, index) => (
        <button
          key={section}
          onClick={() => scrollToSection(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            activeSection === index
              ? "bg-cyberpink scale-125"
              : "bg-white/20 hover:bg-white/40"
          }`}
          aria-label={`Scroll to ${section} section`}
        />
      ))}
    </div>
  );
};