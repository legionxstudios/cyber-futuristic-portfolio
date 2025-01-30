import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyberdark/50 via-cyberdark to-cyberdark" />
      
      {/* Content */}
      <div className="relative z-10 text-center space-y-8">
        {/* 404 Text */}
        <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyberpink to-cybercyan">
          404
        </h1>
        
        {/* Message */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Page Not Found
          </h2>
          <p className="text-gray-400 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Return Home Button */}
        <Link 
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-glass backdrop-blur-sm 
                     border border-white/10 rounded-lg text-white hover:bg-white/10 
                     transition-colors hover:border-cyberpink/50 hover:shadow-lg 
                     hover:shadow-cyberpink/20"
        >
          <Home size={20} />
          Return Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;