import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  FastForward,
  Rewind,
  Volume2,
  Search,
  BookmarkPlus,
  Clock,
  ChevronDown,
  Share2,
  VolumeX,
  ListFilter,
  Bookmark,
  Forward,
  Rewind as RewindIcon,
} from "lucide-react";
import { AudioVisualizer } from "./AudioVisualizer";
export const AudioTranscript = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkedLines, setBookmarkedLines] = useState(new Set());
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [lastTapTime, setLastTapTime] = useState(0);
  const [filterType, setFilterType] = useState("all");
  const audioRef = useRef(null);
  const transcriptRef = useRef(null);
  const seekBarRef = useRef(null);
  const transcript = [
    {
      time: 0,
      text: "Welcome to our AI market analysis podcast.",
      speaker: "Host",
      type: "intro",
    },
    {
      time: 5,
      text: "Today we'll be discussing the future of technology stocks.",
      speaker: "Host",
      type: "intro",
    },
    {
      time: 10,
      text: "Let's start with recent market trends and predictions.",
      speaker: "Host",
      type: "analysis",
    },
    {
      time: 15,
      text: "AI and machine learning sectors show promising growth.",
      speaker: "Analyst",
      type: "insight",
    },
    {
      time: 20,
      text: "Investors are particularly interested in cloud computing.",
      speaker: "Analyst",
      type: "insight",
    },
  ];
  const filteredTranscript = transcript.filter((entry) => {
    const matchesSearch = entry.text
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || entry.type === filterType;
    return matchesSearch && matchesFilter;
  });
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    updateTranscriptScroll();
  };
  const updateTranscriptScroll = () => {
    if (!transcriptRef.current) return;
    const activeEntry = transcript.find(
      (entry) => Math.abs(currentTime - entry.time) < 2,
    );
    if (activeEntry) {
      const element = document.getElementById(`transcript-${activeEntry.time}`);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };
  const handleSeek = (e) => {
    if (!seekBarRef.current) return;
    const rect = seekBarRef.current.getBoundingClientRect();
    const x = e.clientX || e.touches[0].clientX;
    const offset = x - rect.left;
    const percentage = offset / rect.width;
    const newTime = percentage * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  const handleTouchStart = (time) => {
    const now = Date.now();
    if (now - lastTapTime < 300) {
      // Double tap detected
      handleSeek({
        touches: [
          {
            clientX: time,
          },
        ],
      });
    }
    setLastTapTime(now);
  };
  const toggleBookmark = (index) => {
    const newBookmarks = new Set(bookmarkedLines);
    if (newBookmarks.has(index)) {
      newBookmarks.delete(index);
    } else {
      newBookmarks.add(index);
    }
    setBookmarkedLines(newBookmarks);
  };
  const skipForward = () => {
    audioRef.current.currentTime += 10;
  };
  const skipBackward = () => {
    audioRef.current.currentTime -= 10;
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };
  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Audio Player */}
      <div className="bg-gray-800 rounded-lg p-4 sm:p-6 relative">
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{
              scale: isPlaying ? [1, 1.02, 1] : 1,
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
            className="relative"
            onTouchStart={() => setIsPlaying(!isPlaying)}
          >
            <motion.div
              animate={{
                rotate: isPlaying ? 360 : 0,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
              style={{
                filter: "blur(1px)",
              }}
            />
            <AudioVisualizer
              isPlaying={isPlaying}
              audioRef={audioRef}
              isExpanded={false}
            />
          </motion.div>
        </div>
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-400 mb-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div
            ref={seekBarRef}
            className="h-2 bg-gray-700 rounded-full cursor-pointer group touch-pan-x"
            onClick={handleSeek}
            onTouchMove={handleSeek}
          >
            <div
              className="h-full bg-purple-500 rounded-full relative transition-all duration-100 group-hover:bg-purple-600"
              style={{
                width: `${(currentTime / duration) * 100}%`,
              }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setShowVolumeSlider(!showVolumeSlider)}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-700"
            >
              {volume > 0 ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
            <AnimatePresence>
              {showVolumeSlider && (
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
                  className="absolute bottom-full left-0 mb-2 bg-gray-700 p-2 rounded-lg shadow-lg"
                >
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-24 accent-purple-500"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{
                scale: 0.95,
              }}
              onClick={skipBackward}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-700"
            >
              <RewindIcon size={20} />
            </motion.button>
            <motion.button
              whileTap={{
                scale: 0.95,
              }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-4 bg-purple-500 hover:bg-purple-600 rounded-full text-white transition-colors shadow-lg"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </motion.button>
            <motion.button
              whileTap={{
                scale: 0.95,
              }}
              onClick={skipForward}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-700"
            >
              <Forward size={20} />
            </motion.button>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-700"
            >
              <ListFilter size={20} />
            </button>
            <AnimatePresence>
              {showFilters && (
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
                  className="absolute bottom-full right-0 mb-2 bg-gray-700 p-2 rounded-lg shadow-lg min-w-[120px]"
                >
                  <select
                    value={playbackRate}
                    onChange={(e) => {
                      setPlaybackRate(Number(e.target.value));
                      audioRef.current.playbackRate = Number(e.target.value);
                    }}
                    className="w-full p-2 bg-gray-600 rounded text-white text-sm mb-2"
                  >
                    {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((rate) => (
                      <option key={rate} value={rate}>
                        {rate}x Speed
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => setShowBookmarks(!showBookmarks)}
                    className="w-full p-2 text-left text-sm text-gray-200 hover:bg-gray-600 rounded flex items-center gap-2"
                  >
                    <Bookmark size={14} />
                    Bookmarks ({bookmarkedLines.size})
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      {/* Transcript */}
      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search transcript..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 bg-gray-700 rounded-lg text-white border-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Types</option>
            <option value="intro">Intro</option>
            <option value="analysis">Analysis</option>
            <option value="insight">Insight</option>
          </select>
        </div>
        <div
          ref={transcriptRef}
          className="space-y-3 max-h-[400px] overflow-y-auto hide-scrollbar"
        >
          {filteredTranscript.map((entry, index) => (
            <motion.div
              key={index}
              id={`transcript-${entry.time}`}
              layout
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className={`flex gap-3 p-3 rounded-lg transition-colors
                ${Math.abs(currentTime - entry.time) < 2 ? "bg-purple-900/20" : "bg-gray-800"}
                hover:bg-gray-700/50`}
              onTouchStart={() => handleTouchStart(entry.time)}
            >
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-400 whitespace-nowrap">
                  {formatTime(entry.time)}
                </span>
                <span className="text-xs text-gray-500">{entry.speaker}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-300">{entry.text}</p>
                <span className="text-xs text-gray-500 mt-1">{entry.type}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmark(index);
                }}
                className={`p-2 rounded-full transition-colors
                  ${bookmarkedLines.has(index) ? "text-purple-500 bg-purple-500/20" : "text-gray-400 hover:text-purple-500"}`}
              >
                <BookmarkPlus size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      <audio
        ref={audioRef}
        src="https://example.com/podcast.mp3"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(audioRef.current.duration)}
      />
    </div>
  );
};
