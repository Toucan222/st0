import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Send,
  ThumbsUp,
  Reply,
  MoreHorizontal,
  Edit2,
} from "lucide-react";
import { RichTextEditor } from "./RichTextEditor";
export const GroupDiscussions = () => {
  const [newMessage, setNewMessage] = useState("");
  const [attachments, setAttachments] = useState<
    Array<{
      name: string;
      size: number;
    }>
  >([]);
  const handleAttach = (files: FileList) => {
    const newAttachments = Array.from(files).map((file) => ({
      name: file.name,
      size: file.size,
    }));
    setAttachments([...attachments, ...newAttachments]);
  };
  const discussions = [
    {
      id: 1,
      author: "John D.",
      message:
        "What's everyone's thought on the recent tech earnings? Particularly interested in cloud segment performance.",
      time: "10m ago",
      likes: 5,
      replies: [
        {
          id: 1,
          author: "Sarah K.",
          message:
            "Cloud growth numbers were impressive across the board. AWS, Azure, and GCP all showed strong momentum.",
          time: "5m ago",
          likes: 3,
        },
      ],
    },
    {
      id: 2,
      author: "Mike R.",
      message:
        "New AI chip announcements coming up next week. Could be a major catalyst for semiconductor stocks.",
      time: "1h ago",
      likes: 8,
      replies: [],
    },
  ];
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium">
            J
          </div>
          <div className="flex-1">
            <RichTextEditor
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Start a discussion..."
              attachments={attachments}
              onAttach={handleAttach}
            />
            <div className="flex justify-end mt-2">
              <button className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600 transition-colors flex items-center gap-2">
                <Send size={14} />
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {discussions.map((discussion) => (
          <motion.div
            key={discussion.id}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium">
                {discussion.author[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {discussion.author}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {discussion.time}
                    </span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {discussion.message}
                </p>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-purple-500">
                    <ThumbsUp size={14} />
                    <span>{discussion.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-purple-500">
                    <Reply size={14} />
                    <span>Reply</span>
                  </button>
                </div>
              </div>
            </div>
            {discussion.replies.length > 0 && (
              <div className="ml-11 mt-4 space-y-4">
                {discussion.replies.map((reply) => (
                  <div key={reply.id} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm">
                      {reply.author[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {reply.author}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {reply.time}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        {reply.message}
                      </p>
                      <button className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-purple-500">
                        <ThumbsUp size={14} />
                        <span>{reply.likes}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
