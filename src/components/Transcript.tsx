import React, { useState } from "react";
import { Search, BookmarkPlus } from "lucide-react";
export const Transcript = ({ currentTime }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkedLines, setBookmarkedLines] = useState(new Set());
  const transcript = [
    {
      time: 0,
      text: "Welcome to our AI market analysis podcast.",
    },
    {
      time: 5,
      text: "Today we'll be discussing the future of technology stocks.",
    },
    {
      time: 10,
      text: "Let's start with recent market trends and predictions.",
    },
    {
      time: 15,
      text: "AI and machine learning sectors show promising growth.",
    },
    {
      time: 20,
      text: "Investors are particularly interested in cloud computing.",
    },
  ];
  const filteredTranscript = transcript.filter((entry) =>
    entry.text.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const toggleBookmark = (index) => {
    const newBookmarks = new Set(bookmarkedLines);
    if (newBookmarks.has(index)) {
      newBookmarks.delete(index);
    } else {
      newBookmarks.add(index);
    }
    setBookmarkedLines(newBookmarks);
  };
  return (
    <div className="p-6 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">Transcript</h2>
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search transcript..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 pl-10 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
      </div>
      <div className="space-y-4 max-h-48 overflow-y-auto">
        {filteredTranscript.map((entry, index) => (
          <div
            key={index}
            className={`flex gap-3 p-2 rounded-lg transition-colors ${Math.abs(currentTime - entry.time) < 2 ? "bg-purple-50 dark:bg-purple-900/20" : ""}`}
          >
            <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
              {formatTime(entry.time)}
            </span>
            <p className="text-sm dark:text-gray-300 flex-1">{entry.text}</p>
            <button
              onClick={() => toggleBookmark(index)}
              className={`p-1 rounded-full transition-colors ${bookmarkedLines.has(index) ? "text-purple-500" : "text-gray-400 hover:text-purple-500"}`}
            >
              <BookmarkPlus size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};
