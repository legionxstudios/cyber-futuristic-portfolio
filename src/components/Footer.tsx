import { Link } from "react-router-dom";
import { Twitter, Linkedin, Instagram, Camera } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socials = [
    {
      icon: Twitter,
      href: "https://x.com/legionx_studios",
      label: "X (Twitter)"
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/tudorstanescu/",
      label: "LinkedIn"
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/legionxstudios/",
      label: "Instagram"
    },
    {
      icon: Camera,
      href: "https://www.legionxstudios.com/",
      label: "Photography"
    }
  ];
  
  return (
    <footer className="mt-20 py-8 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400">
            Copyright © {currentYear} Tudor Stanescu. All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <div className="flex gap-4 mr-6">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyberpink transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
            <Link 
              to="/privacy-policy" 
              className="text-gray-400 hover:text-cyberpink transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="text-gray-400 hover:text-cyberpink transition-colors"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};