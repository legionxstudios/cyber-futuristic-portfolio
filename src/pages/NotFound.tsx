import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyberdark/50 via-cyberdark to-cyberdark" />
      
      {/* Content */}
      <div className="relative z-10 text-center space-y-8 max-w-2xl mx-auto">
        {/* 404 Image */}
        <div className="mb-8">
          <img 
            src="/lovable-uploads/7258cc15-bf02-4def-8f58-16354b60a865.png"
            alt="404 Error"
            className="w-64 h-64 mx-auto object-cover rounded-full border-4 border-cyberpink/50 shadow-lg shadow-cyberpink/20"
          />
        </div>

        {/* 404 Text */}
        <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyberpink to-cybercyan animate-glow">
          404
        </h1>
        
        {/* Message */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Lost in Cyberspace
          </h2>
          <p className="text-gray-400 max-w-md mx-auto text-lg">
            The page you're looking for has drifted into the digital void.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-glass backdrop-blur-sm 
                     border border-cyberpink/50 rounded-lg text-white hover:bg-white/10 
                     transition-all duration-300 hover:scale-105 hover:shadow-lg 
                     hover:shadow-cyberpink/20 group"
          >
            <Home className="w-5 h-5 group-hover:text-cyberpink transition-colors" />
            Return Home
          </Link>
          
          <Link 
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 
                     text-white/80 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:text-cybercyan transition-colors" />
            Back to Safety
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;