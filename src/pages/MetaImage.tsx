import { motion } from "framer-motion";
import { TypeWriter } from "@/components/hero/TypeWriter";

const MetaImage = () => {
  const texts = ["#HireMeHuman"];
  
  return (
    <div className="h-[630px] w-[1200px] relative flex items-center justify-center overflow-hidden bg-cyberdark">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/7258cc15-bf02-4def-8f58-16354b60a865.png')] bg-cover bg-center opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-cyberdark via-transparent to-transparent" />
      
      <motion.h1
        initial={{ opacity: 1 }}
        className="relative z-10 text-7xl font-bold text-white font-mono"
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyberpink to-cybercyan">
          {">_"} {texts[0]}
        </span>
      </motion.h1>
    </div>
  );
};

export default MetaImage;