import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Globe,
  Target,
  Activity,
  ChevronRight,
  Star,
  Clock,
  BarChart2,
  Bell,
  ArrowRight,
  Share2,
  Info,
  Check,
  X,
  Link,
  Twitter,
  Linkedin,
  ChevronDown,
} from "lucide-react";
import AlertModal from "./AlertModal";
import { Logo } from "./Logo";
const StockGraph = () => {
  const points = [
    178.72, 180.5, 182.3, 181.2, 183.5, 182.8, 184.2, 183.7, 185.1, 184.6,
    186.2, 185.8, 187.4, 186.9,
  ];
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min;
  const normalize = (value) => ((value - min) / range) * 40;
  return (
    <div className="h-16 w-full flex items-end gap-0.5 mt-4">
      {points.map((point, i) => (
        <div
          key={i}
          className="flex-1 bg-white/20 hover:bg-white/30 transition-all rounded-sm cursor-pointer group relative"
          style={{
            height: `${normalize(point)}px`,
          }}
        >
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            ${point}
          </div>
        </div>
      ))}
    </div>
  );
};
export const Summary = ({ stock }) => {
  const [activeInsight, setActiveInsight] = useState(null);
  const [showAllStats, setShowAllStats] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const stats = [
    {
      label: "Market Cap",
      value: "2.8T",
      icon: Globe,
      change: "+2.4%",
      isUp: true,
      priority: 1,
    },
    {
      label: "Volume",
      value: "52.3M",
      icon: Activity,
      change: "-1.2%",
      isUp: false,
      priority: 1,
    },
    {
      label: "Analysts",
      value: "45",
      icon: Users,
      change: "+5",
      isUp: true,
      priority: 2,
    },
    {
      label: "Target",
      value: "$198.50",
      icon: Target,
      change: "+$12.30",
      isUp: true,
      priority: 2,
    },
  ];
  const insights = [
    {
      title: "Technical Analysis",
      description: "Strong momentum with bullish indicators",
      icon: BarChart2,
      color: "text-blue-500",
      metrics: {
        momentum: "High",
        trend: "Upward",
        support: "$175.20",
      },
    },
    {
      title: "Market Sentiment",
      description: "Positive institutional interest and retail confidence",
      icon: Target,
      color: "text-green-500",
      metrics: {
        institutional: "Bullish",
        retail: "Positive",
        news: "Favorable",
      },
    },
  ];
  const quickActions = [
    {
      label: "Alert",
      icon: Bell,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      onClick: () => setShowAlertModal(true),
    },
    {
      label: "Save",
      icon: Star,
      color: `text-${isSaved ? "yellow" : "purple"}-500`,
      bgColor: `bg-${isSaved ? "yellow" : "purple"}-500/10`,
      onClick: () => handleSave(),
    },
    {
      label: "Share",
      icon: Share2,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      onClick: () => setShowShareSheet(true),
    },
  ];
  const handleShare = async (platform) => {
    setShowShareSheet(false);
    try {
      if (platform === "copy") {
        await navigator.clipboard.writeText(`Check out ${stock.symbol} stock!`);
        showToastMessage("Link copied to clipboard");
      } else {
        if (navigator.share) {
          await navigator.share({
            title: `${stock.symbol} Stock`,
            text: `Check out ${stock.symbol} stock!`,
            url: window.location.href,
          });
        }
      }
    } catch (error) {
      showToastMessage("Failed to share");
    }
  };
  const handleSave = () => {
    setIsSaved(!isSaved);
    showToastMessage(isSaved ? "Removed from watchlist" : "Added to watchlist");
  };
  const handleAlert = (alertSettings) => {
    setShowAlertModal(false);
    showToastMessage("Price alert created");
  };
  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="relative mx-3 mb-4"
      >
        <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="relative h-12 w-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center text-white font-bold text-xl overflow-hidden">
              <motion.div
                initial={{
                  scale: 0.5,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Logo className="w-6 h-6 text-white" />
              </motion.div>
              <motion.div
                initial={{
                  opacity: 1,
                }}
                animate={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {stock.symbol[0]}
              </motion.div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">{stock.symbol}</h2>
                <span className="text-sm px-2 py-0.5 rounded-full bg-white/20 text-white/90">
                  {stock.name}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold text-white">
                  ${stock.price}
                </span>
                <div
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-sm font-medium
                ${stock.change >= 0 ? "bg-green-500/20 text-green-100" : "bg-red-500/20 text-red-100"}`}
                >
                  {stock.change >= 0 ? (
                    <TrendingUp size={14} />
                  ) : (
                    <TrendingDown size={14} />
                  )}
                  {stock.change}%
                </div>
              </div>
            </div>
          </div>
          <StockGraph />
        </div>
      </motion.div>
      <div className="grid grid-cols-3 gap-2 px-3 mb-4">
        {quickActions.map((action) => (
          <motion.button
            key={action.label}
            whileTap={{
              scale: 0.95,
            }}
            onClick={action.onClick}
            className={`flex flex-col items-center p-3 rounded-xl ${action.bgColor} border border-gray-700/50`}
          >
            <action.icon size={18} className={action.color} />
            <span className="text-[10px] font-medium text-gray-400 mt-1">
              {action.label}
            </span>
          </motion.button>
        ))}
      </div>
      <div className="px-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-400">Key Metrics</h3>
          <button
            onClick={() => setShowAllStats(!showAllStats)}
            className="text-xs text-purple-400"
          >
            {showAllStats ? "Show Less" : "Show More"}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {stats
            .filter((stat) => stat.priority === 1 || showAllStats)
            .map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                className="p-3 rounded-xl border border-gray-700/50 bg-gray-800/50"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-gray-700/50">
                    <stat.icon size={14} className="text-gray-400" />
                  </div>
                  <div
                    className={`text-xs ${stat.isUp ? "text-green-400" : "text-red-400"}`}
                  >
                    {stat.change}
                  </div>
                </div>
                <div className="text-lg font-semibold text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
        </div>
      </div>
      <div className="mt-4 px-3">
        <h3 className="text-sm font-medium text-gray-400 mb-3">
          Market Insights
        </h3>
        <div className="space-y-2">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={false}
              animate={{
                height: activeInsight === index ? "auto" : "76px",
              }}
              className="p-3 rounded-xl border border-gray-700/50 bg-gray-800/50 overflow-hidden cursor-pointer"
              onClick={() =>
                setActiveInsight(activeInsight === index ? null : index)
              }
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-gray-700/50">
                    <insight.icon size={16} className={insight.color} />
                  </div>
                  <h4 className="font-medium text-white">{insight.title}</h4>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform ${activeInsight === index ? "rotate-180" : ""}`}
                />
              </div>
              <p className="text-sm text-gray-400 mb-2">
                {insight.description}
              </p>
              <AnimatePresence>
                {activeInsight === index && (
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
                    className="pt-2 border-t border-gray-700/50"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(insight.metrics).map(([key, value]) => (
                        <div
                          key={key}
                          className="p-2 bg-gray-700/50 rounded-lg"
                        >
                          <div className="text-xs text-gray-400 mb-1">
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </div>
                          <div className="font-medium text-white">{value}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 50,
            }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 px-4 py-2 bg-gray-800 text-white rounded-full shadow-lg flex items-center gap-2 z-50"
          >
            <Check size={14} />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showShareSheet && (
          <>
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
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowShareSheet(false)}
            />
            <motion.div
              initial={{
                opacity: 0,
                y: "100%",
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: "100%",
              }}
              className="fixed bottom-0 left-0 right-0 bg-gray-800 rounded-t-xl z-50 p-4 max-w-md mx-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Share</h3>
                <button onClick={() => setShowShareSheet(false)}>
                  <X size={20} className="text-gray-400" />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[
                  {
                    icon: Link,
                    label: "Copy Link",
                    id: "copy",
                  },
                  {
                    icon: Twitter,
                    label: "Twitter",
                    id: "twitter",
                  },
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    id: "linkedin",
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleShare(item.id)}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="p-4 bg-gray-700 rounded-full">
                      <item.icon size={20} className="text-gray-300" />
                    </div>
                    <span className="text-sm text-gray-300">{item.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showAlertModal && (
          <AlertModal
            stock={stock}
            onClose={() => setShowAlertModal(false)}
            onSave={handleAlert}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
