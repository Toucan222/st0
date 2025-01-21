import React, { useCallback, useEffect, useState, useRef } from "react";
import { AudioPlayer } from "./components/AudioPlayer";
import { Transcript } from "./components/Transcript";
import { Scorecard } from "./components/Scorecard";
import { MarketPredictions } from "./components/MarketPredictions";
import { Summary } from "./components/Summary";
import { GroupInsights } from "./components/GroupInsights";
import {
  Headphones,
  LineChart,
  BarChart,
  Layout,
  Users,
  BarChart2,
  User,
  Zap,
  Settings,
  LogOut,
  Bell,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AudioTranscript } from "./components/AudioTranscript";
import { Loader2 } from "lucide-react";
import { StockTable } from "./components/StockTable";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useKeyboardShortcut } from "./hooks/useKeyboardShortcut";
import { LoadingOverlay } from "./components/LoadingOverlay";
const LoadingState = ({ tab }) => (
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
    className="flex flex-col items-center justify-center p-12 space-y-4"
  >
    <div className="relative">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
        className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-lg"
      />
      <Loader2 className="w-8 h-8 text-purple-500 animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>
    <div className="text-center">
      <div className="text-sm font-medium text-white mb-1">
        Loading {tab}...
      </div>
      <div className="text-xs text-gray-400">This may take a moment</div>
    </div>
  </motion.div>
);
export function App() {
  const [activeTab, setActiveTab] = useLocalStorage("activeTab", "summary");
  const [selectedStock, setSelectedStock] = useLocalStorage("selectedStock", {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 178.72,
    change: 2.34,
    changePercent: 1.32,
  });
  const tabs = [
    {
      id: "summary",
      label: "Summary",
      icon: Layout,
    },
    {
      id: "audio",
      label: "Audio",
      icon: Headphones,
    },
    {
      id: "scorecard",
      label: "Score",
      icon: BarChart,
    },
    {
      id: "predictions",
      label: "Predict",
      icon: LineChart,
    },
    {
      id: "groups",
      label: "Groups",
      icon: Users,
    },
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [previousTab, setPreviousTab] = useState(null);
  const requestRef = useRef();
  const audioContext = useRef();
  useKeyboardShortcut({
    "1": () => handleTabChange("summary"),
    "2": () => handleTabChange("audio"),
    "3": () => handleTabChange("scorecard"),
    "4": () => handleTabChange("predictions"),
    "5": () => handleTabChange("groups"),
    m: () => handleTabChange("all-stocks"),
    a: () => handleTabChange("account"),
  });
  useEffect(() => {
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, []);
  const handleTabChange = useCallback(
    (tabId) => {
      setPreviousTab(activeTab);
      setIsLoading(true);
      setActiveTab(tabId);
      setTimeout(() => setIsLoading(false), 300);
    },
    [activeTab],
  );
  const renderContent = () => {
    if (activeTab === "all-stocks") {
      return (
        <StockTable
          onSelectStock={(stock) => {
            setSelectedStock(stock);
            handleTabChange("summary");
          }}
        />
      );
    }
    if (activeTab === "account") {
      return (
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
            y: -20,
          }}
          className="p-4 space-y-6"
        >
          <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-xl border border-gray-700/50">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold">
              JD
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">John Doe</h2>
              <p className="text-gray-400">john.doe@example.com</p>
            </div>
          </div>
          <div className="space-y-2">
            <button className="w-full p-4 bg-gray-800 rounded-xl border border-gray-700/50 flex items-center justify-between text-white hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center gap-3">
                <Bell size={20} />
                <span>Notifications</span>
              </div>
              <div className="bg-purple-500 px-2 py-0.5 rounded-full text-sm">
                3
              </div>
            </button>
            <button className="w-full p-4 bg-gray-800 rounded-xl border border-gray-700/50 flex items-center gap-3 text-white hover:bg-gray-700/50 transition-colors">
              <Settings size={20} />
              <span>Settings</span>
            </button>
            <button className="w-full p-4 bg-gray-800 rounded-xl border border-gray-700/50 flex items-center gap-3 text-red-400 hover:bg-red-500/10 transition-colors">
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
          <div className="p-4 bg-gray-800 rounded-xl border border-gray-700/50 space-y-4">
            <h3 className="text-lg font-semibold text-white">
              Premium Features
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400">
                <div className="h-2 w-2 rounded-full bg-purple-500" />
                <span>Advanced Market Analytics</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <div className="h-2 w-2 rounded-full bg-purple-500" />
                <span>Real-time Trading Signals</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <div className="h-2 w-2 rounded-full bg-purple-500" />
                <span>Portfolio Optimization</span>
              </div>
            </div>
            <button className="w-full p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
              Upgrade to Premium
            </button>
          </div>
        </motion.div>
      );
    }
    return (
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingState tab={activeTab} />
        ) : (
          <motion.div
            key={activeTab}
            initial={{
              opacity: 0,
              x: previousTab
                ? tabs.findIndex((t) => t.id === activeTab) >
                  tabs.findIndex((t) => t.id === previousTab)
                  ? 20
                  : -20
                : 0,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: previousTab
                ? tabs.findIndex((t) => t.id === activeTab) >
                  tabs.findIndex((t) => t.id === previousTab)
                  ? -20
                  : 20
                : 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          >
            {activeTab === "summary" && <Summary stock={selectedStock} />}
            {activeTab === "audio" && <AudioTranscript />}
            {activeTab === "scorecard" && <Scorecard stock={selectedStock} />}
            {activeTab === "predictions" && (
              <MarketPredictions stock={selectedStock} />
            )}
            {activeTab === "groups" && <GroupInsights />}
          </motion.div>
        )}
      </AnimatePresence>
    );
  };
  return (
    <ErrorBoundary>
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-md mx-auto min-h-screen relative">
          <div className="relative bg-gray-800/95 backdrop-blur-xl min-h-screen overflow-hidden rounded-none md:rounded-xl shadow-2xl border border-gray-700/50">
            <div className="fixed top-0 left-0 right-0 max-w-md mx-auto z-30">
              <div className="p-2 border-b border-gray-700/50 bg-gray-800/95 backdrop-blur-xl">
                <div className="grid grid-cols-7 gap-0.5">
                  {[
                    {
                      id: "summary",
                      label: "Home",
                      icon: Layout,
                    },
                    {
                      id: "audio",
                      label: "Audio",
                      icon: Headphones,
                    },
                    {
                      id: "scorecard",
                      label: "Score",
                      icon: BarChart,
                    },
                    {
                      id: "predictions",
                      label: "AI",
                      icon: LineChart,
                    },
                    {
                      id: "groups",
                      label: "Group",
                      icon: Users,
                    },
                    {
                      id: "all-stocks",
                      label: "Market",
                      icon: BarChart2,
                    },
                    {
                      id: "account",
                      label: "Me",
                      icon: User,
                    },
                  ].map((tab) => (
                    <motion.button
                      key={tab.id}
                      whileTap={{
                        scale: 0.95,
                      }}
                      onClick={() => handleTabChange(tab.id)}
                      className={`flex flex-col items-center py-1.5 px-1 rounded-lg transition-all
                      ${activeTab === tab.id ? "text-purple-400 bg-gray-700/50" : "text-gray-400 hover:text-purple-400 hover:bg-gray-700/30"}`}
                    >
                      <tab.icon size={18} className="mb-0.5" />
                      <span className="text-[10px] font-medium">
                        {tab.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
            <div className="pt-[72px] pb-safe">
              <div className="min-h-[calc(100vh-72px)] flex flex-col">
                <div className="flex-1">{renderContent()}</div>
                <div className="h-safe pb-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
