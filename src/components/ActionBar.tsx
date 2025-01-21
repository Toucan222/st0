import React, { useEffect, useState } from "react";
import {
  Download,
  Share2,
  BookmarkPlus,
  Check,
  Link,
  Twitter,
  Loader2,
  X,
  BarChart2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
interface ActionBarProps {
  onViewAllStocks: () => void;
}
export const ActionBar = ({ onViewAllStocks }: ActionBarProps) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [isLoading, setIsLoading] = useState(false);
  const handleShare = (platform) => {
    setShowShareMenu(false);
    setToastMessage(`Shared on ${platform}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };
  const handleSave = () => {
    setToastMessage("Analysis saved to watchlist");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };
  const handleDownload = () => {
    setToastMessage("Report download started");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };
  const handleAction = async (action, callback) => {
    setIsLoading(true);
    try {
      await callback();
      setToastMessage(`Successfully ${action}`);
      setToastType("success");
    } catch (error) {
      setToastMessage(`Failed to ${action}`);
      setToastType("error");
    } finally {
      setIsLoading(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "s":
            e.preventDefault();
            handleSave();
            break;
          case "d":
            e.preventDefault();
            handleDownload();
            break;
          // Add more shortcuts
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  return (
    <div className="relative p-6 border-t border-gray-700/50 bg-gray-800/50 backdrop-blur-sm">
      <div className="flex justify-around">
        <button
          onClick={() => handleAction("saved", handleSave)}
          disabled={isLoading}
          className="group relative flex flex-col items-center gap-1 text-gray-400 hover:text-purple-400 transition-colors disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <BookmarkPlus size={20} />
          )}
          <span className="text-xs">Save</span>
        </button>
        <button
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="group relative flex flex-col items-center gap-1 text-gray-400 hover:text-purple-400 transition-colors"
        >
          <Share2 size={20} />
          <span className="text-xs">Share</span>
        </button>
        <button
          onClick={onViewAllStocks}
          className="group relative flex flex-col items-center gap-1 text-gray-400 hover:text-purple-400 transition-colors"
        >
          <BarChart2 size={20} />
          <span className="text-xs">All Stocks</span>
        </button>
        <button
          onClick={handleDownload}
          className="group relative flex flex-col items-center gap-1 text-gray-400 hover:text-purple-400 transition-colors"
        >
          <Download size={20} />
          <span className="text-xs">Download</span>
        </button>
      </div>
      <AnimatePresence>
        {showShareMenu && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 10,
            }}
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 min-w-[120px]"
          >
            <button
              onClick={() => handleShare("Copy Link")}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Link size={14} /> Copy Link
            </button>
            <button
              onClick={() => handleShare("Twitter")}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Twitter size={14} /> Twitter
            </button>
            <button
              onClick={() => handleShare("LinkedIn")}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div size={14} /> LinkedIn
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 20,
            }}
            className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-4 py-2 ${toastType === "success" ? "bg-green-500" : "bg-red-500"} text-white rounded-full text-sm flex items-center gap-2 shadow-lg`}
          >
            {toastType === "success" ? <Check size={14} /> : <X size={14} />}
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
