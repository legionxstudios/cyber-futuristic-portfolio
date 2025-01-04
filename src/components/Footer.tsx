import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-20 py-8 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400">
            Copyright © {currentYear} Tudor Stanescu. All Rights Reserved.
          </div>
          <div className="flex gap-6">
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