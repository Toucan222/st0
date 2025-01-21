import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
interface LoadingOverlayProps {
  message?: string;
}
export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  message = "Loading...",
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center">
        <div className="relative mb-4">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 blur-lg"
          />
          <Loader2 className="w-8 h-8 text-purple-500 animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <p className="text-white text-sm font-medium">{message}</p>
      </div>
    </motion.div>
  );
};
