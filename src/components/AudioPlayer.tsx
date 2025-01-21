import React, { useEffect, useState, useRef } from "react";
import {
  Play,
  Pause,
  FastForward,
  Rewind,
  Volume2,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AudioVisualizer } from "./AudioVisualizer";
export const AudioPlayer = ({ onTimeUpdate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef(null);
  const speedOptions = [0.5, 1, 1.5, 2];
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    onTimeUpdate(audioRef.current.currentTime);
  };
  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  return (
    <div
      className={`p-6 ${isExpanded ? "fixed inset-0 bg-white dark:bg-gray-800 z-50" : ""}`}
    >
      <div className="relative">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute top-0 right-0 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {isExpanded ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
        </button>
        <div
          className={`flex justify-center mb-6 relative ${isExpanded ? "mt-8" : ""}`}
        >
          <motion.div
            animate={{
              scale: isPlaying ? [1, 1.02, 1] : 1,
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
            className="relative"
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
              className={`rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 ${isExpanded ? "w-48 h-48" : "w-32 h-32"}`}
              style={{
                filter: "blur(1px)",
              }}
            />
            <AudioVisualizer
              isPlaying={isPlaying}
              audioRef={audioRef}
              isExpanded={isExpanded}
            />
          </motion.div>
        </div>
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div
            className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer group"
            onClick={handleSeek}
          >
            <div
              className="h-full bg-purple-500 rounded-full relative transition-all duration-100 group-hover:bg-purple-600"
              style={{
                width: `${(currentTime / duration) * 100}%`,
              }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-4 mb-4">
          <motion.button
            whileTap={{
              scale: 0.95,
            }}
            className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-gray-700 transition-colors"
            onClick={() => {
              audioRef.current.currentTime -= 10;
            }}
          >
            <Rewind size={24} />
          </motion.button>
          <motion.button
            whileTap={{
              scale: 0.95,
            }}
            className="p-3 bg-purple-500 hover:bg-purple-600 rounded-full text-white transition-colors shadow-lg shadow-purple-500/20"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </motion.button>
          <motion.button
            whileTap={{
              scale: 0.95,
            }}
            className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-gray-700 transition-colors"
            onClick={() => {
              audioRef.current.currentTime += 10;
            }}
          >
            <FastForward size={24} />
          </motion.button>
        </div>
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-2 group relative">
            <Volume2 size={16} className="text-gray-500 dark:text-gray-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className="w-20 accent-purple-500"
            />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {Math.round(volume * 100)}%
            </div>
          </div>
          <div className="flex gap-2">
            {speedOptions.map((speed) => (
              <motion.button
                key={speed}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={() => setPlaybackRate(speed)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${playbackRate === speed ? "bg-purple-500 text-white shadow-lg shadow-purple-500/20" : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"}`}
              >
                {speed}x
              </motion.button>
            ))}
          </div>
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
