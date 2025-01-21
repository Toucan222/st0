import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart2,
  TrendingUp,
  MessageSquare,
  ThumbsUp,
  Share2,
  Plus,
  UserPlus,
  Download,
  X,
} from "lucide-react";
import { RichTextEditor } from "./RichTextEditor";
const analyses = [
  {
    id: 1,
    title: "Technical Analysis: AAPL Breakout Pattern",
    author: "Sarah K.",
    date: "2h ago",
    content:
      "Apple showing strong momentum with a clear breakout pattern forming. Key resistance levels have been broken with increasing volume, suggesting potential for continued upward movement.",
    tags: ["Technical Analysis", "Breakout", "Momentum"],
    likes: 12,
    comments: 5,
    contributors: ["Sarah", "Mike", "John"],
  },
  {
    id: 2,
    title: "Cloud Segment Growth Analysis",
    author: "Mike R.",
    date: "4h ago",
    content:
      "Deep dive into cloud computing segment performance across major tech companies. AWS, Azure, and GCP all showing impressive growth metrics with expanding margins.",
    tags: ["Cloud Computing", "Growth", "Market Share"],
    likes: 8,
    comments: 3,
    contributors: ["Mike", "David"],
  },
  {
    id: 3,
    title: "AI Market Impact Assessment",
    author: "John D.",
    date: "1d ago",
    content:
      "Comprehensive analysis of AI technology impact on market valuations. Focus on semiconductor companies and cloud providers positioning for AI workloads.",
    tags: ["AI", "Technology", "Market Impact"],
    likes: 15,
    comments: 7,
    contributors: ["John", "Sarah", "Alex"],
  },
];
export const GroupAnalysis = () => {
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [showNewAnalysis, setShowNewAnalysis] = useState(false);
  const [newAnalysis, setNewAnalysis] = useState({
    content: "",
    attachments: [] as Array<{
      name: string;
      size: number;
    }>,
    tags: [] as string[],
  });
  const handleAttach = (files: FileList) => {
    const newAttachments = Array.from(files).map((file) => ({
      name: file.name,
      size: file.size,
    }));
    setNewAnalysis((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments],
    }));
  };
  return (
    <div className="space-y-6">
      <button
        onClick={() => setShowNewAnalysis(true)}
        className="w-full p-4 border-2 border-dashed border-purple-200 dark:border-purple-900/50 rounded-lg text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors flex items-center justify-center gap-2"
      >
        <Plus size={16} />
        Create New Analysis
      </button>
      <AnimatePresence>
        {showNewAnalysis && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
              }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-lg font-semibold dark:text-white">
                  New Analysis
                </h2>
                <button
                  onClick={() => setShowNewAnalysis(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-4 space-y-4">
                <input
                  type="text"
                  placeholder="Analysis Title"
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <RichTextEditor
                  value={newAnalysis.content}
                  onChange={(e) =>
                    setNewAnalysis({
                      ...newAnalysis,
                      content: e.target.value,
                    })
                  }
                  placeholder="Write your analysis..."
                  attachments={newAnalysis.attachments}
                  onAttach={handleAttach}
                />
                <div className="flex items-center gap-2 flex-wrap">
                  <input
                    type="text"
                    placeholder="Add tags (press Enter)"
                    className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  {newAnalysis.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-sm rounded-full flex items-center gap-1"
                    >
                      {tag}
                      <button className="hover:text-purple-700">
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
                <button
                  onClick={() => setShowNewAnalysis(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600 transition-colors">
                  Publish Analysis
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <div className="space-y-4">
        {analyses.map((analysis) => (
          <motion.div
            key={analysis.id}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    {analysis.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>{analysis.author}</span>
                    <span>•</span>
                    <span>{analysis.date}</span>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                  <Share2 size={16} />
                </button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {analysis.content}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {analysis.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-purple-500">
                    <ThumbsUp size={14} />
                    <span>{analysis.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-purple-500">
                    <MessageSquare size={14} />
                    <span>{analysis.comments}</span>
                  </button>
                  <button className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-purple-500">
                    <Download size={14} />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {analysis.contributors.map((contributor, index) => (
                      <div
                        key={contributor}
                        className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs border-2 border-white dark:border-gray-800"
                      >
                        {contributor[0]}
                      </div>
                    ))}
                  </div>
                  <button className="w-6 h-6 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-400 hover:border-purple-500 hover:text-purple-500">
                    <UserPlus size={12} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
