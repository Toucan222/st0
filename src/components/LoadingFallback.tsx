import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
export const LoadingFallback = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className="flex flex-col items-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          className="relative mb-4"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-lg" />
          <Loader2 className="w-8 h-8 text-purple-500 animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
        <p className="text-white text-sm">Loading application...</p>
      </motion.div>
    </div>
  );
};
