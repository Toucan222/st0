import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react";
export const MarketPredictions = () => {
  const [timeframe, setTimeframe] = useState("1year");
  const [hoveredCase, setHoveredCase] = useState(null);
  const [activePrediction, setActivePrediction] = useState(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const predictions = {
    "1year": {
      bear: {
        description: "Conservative growth with 5% market share increase",
        growth: 5,
        confidence: 80,
        risks: [
          "Market competition",
          "Economic slowdown",
          "Regulatory changes",
        ],
        opportunities: [
          "New market entry",
          "Cost optimization",
          "Strategic partnerships",
        ],
        keyMetrics: {
          revenue: "+3%",
          margins: "-1%",
          marketShare: "+2%",
        },
      },
      base: {
        description: "Steady expansion into new markets, 15% growth",
        growth: 15,
        confidence: 75,
        risks: [
          "Execution delays",
          "Resource constraints",
          "Market saturation",
        ],
        opportunities: [
          "Product expansion",
          "Geographic growth",
          "Operational efficiency",
        ],
        keyMetrics: {
          revenue: "+12%",
          margins: "+2%",
          marketShare: "+5%",
        },
      },
      bull: {
        description: "Breakthrough technology adoption, 30% growth potential",
        growth: 30,
        confidence: 60,
        risks: [
          "Technology adoption rate",
          "Competitive response",
          "Scale challenges",
        ],
        opportunities: [
          "Market leadership",
          "Innovation advantage",
          "Premium positioning",
        ],
        keyMetrics: {
          revenue: "+25%",
          margins: "+5%",
          marketShare: "+10%",
        },
      },
    },
    "2year": {
      bear: {
        description: "Market consolidation phase, 10% growth",
        growth: 10,
        confidence: 70,
        risks: [
          "Market competition",
          "Economic slowdown",
          "Regulatory changes",
        ],
        opportunities: [
          "New market entry",
          "Cost optimization",
          "Strategic partnerships",
        ],
        keyMetrics: {
          revenue: "+3%",
          margins: "-1%",
          marketShare: "+2%",
        },
      },
      base: {
        description: "Product line expansion, 25% growth expected",
        growth: 25,
        confidence: 65,
        risks: [
          "Execution delays",
          "Resource constraints",
          "Market saturation",
        ],
        opportunities: [
          "Product expansion",
          "Geographic growth",
          "Operational efficiency",
        ],
        keyMetrics: {
          revenue: "+12%",
          margins: "+2%",
          marketShare: "+5%",
        },
      },
      bull: {
        description: "Industry leadership position, 45% growth forecast",
        growth: 45,
        confidence: 50,
        risks: [
          "Technology adoption rate",
          "Competitive response",
          "Scale challenges",
        ],
        opportunities: [
          "Market leadership",
          "Innovation advantage",
          "Premium positioning",
        ],
        keyMetrics: {
          revenue: "+25%",
          margins: "+5%",
          marketShare: "+10%",
        },
      },
    },
    "3year": {
      bear: {
        description: "Stable market position, 20% growth",
        growth: 20,
        confidence: 60,
        risks: [
          "Market competition",
          "Economic slowdown",
          "Regulatory changes",
        ],
        opportunities: [
          "New market entry",
          "Cost optimization",
          "Strategic partnerships",
        ],
        keyMetrics: {
          revenue: "+3%",
          margins: "-1%",
          marketShare: "+2%",
        },
      },
      base: {
        description: "International expansion, 40% growth projection",
        growth: 40,
        confidence: 55,
        risks: [
          "Execution delays",
          "Resource constraints",
          "Market saturation",
        ],
        opportunities: [
          "Product expansion",
          "Geographic growth",
          "Operational efficiency",
        ],
        keyMetrics: {
          revenue: "+12%",
          margins: "+2%",
          marketShare: "+5%",
        },
      },
      bull: {
        description: "Market disruption, 70% growth potential",
        growth: 70,
        confidence: 40,
        risks: [
          "Technology adoption rate",
          "Competitive response",
          "Scale challenges",
        ],
        opportunities: [
          "Market leadership",
          "Innovation advantage",
          "Premium positioning",
        ],
        keyMetrics: {
          revenue: "+25%",
          margins: "+5%",
          marketShare: "+10%",
        },
      },
    },
  };
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const timeframes = ["1year", "2year", "3year"];
    const swipeThreshold = 50;
    const diff = touchEndX.current - touchStartX.current;
    if (Math.abs(diff) > swipeThreshold) {
      const currentIndex = timeframes.indexOf(timeframe);
      if (diff > 0 && currentIndex > 0) {
        setTimeframe(timeframes[currentIndex - 1]);
      } else if (diff < 0 && currentIndex < timeframes.length - 1) {
        setTimeframe(timeframes[currentIndex + 1]);
      }
    }
  };
  return (
    <div
      className="p-4 sm:p-6 space-y-6"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-white">Market Predictions</h2>
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
          {["1year", "2year", "3year"].map((period) => (
            <motion.button
              key={period}
              onClick={() => setTimeframe(period)}
              whileTap={{
                scale: 0.95,
              }}
              className={`px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-2
                ${timeframe === period ? "bg-purple-500 text-white shadow-lg shadow-purple-500/20" : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300"}`}
            >
              <Calendar size={14} />
              {period.replace("year", " Year")}
            </motion.button>
          ))}
        </div>
        <div className="text-sm text-gray-400">
          Swipe left/right to change timeframe
        </div>
      </div>
      <div className="space-y-4">
        {Object.entries(predictions[timeframe]).map(([type, data]) => (
          <motion.div
            key={type}
            layout
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
            className={`p-4 rounded-lg transition-all ${activePrediction === type ? "ring-2 ring-purple-500" : ""} ${type === "bear" ? "bg-red-50 dark:bg-red-900/20" : type === "base" ? "bg-gray-50 dark:bg-gray-700/20" : "bg-green-50 dark:bg-green-900/20"}`}
            onClick={() =>
              setActivePrediction(activePrediction === type ? null : type)
            }
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                {type === "bear" ? (
                  <AlertTriangle size={16} className="text-red-500" />
                ) : type === "base" ? (
                  <Info size={16} className="text-gray-500" />
                ) : (
                  <CheckCircle size={16} className="text-green-500" />
                )}
                <h3
                  className={`font-medium ${type === "bear" ? "text-red-700 dark:text-red-400" : type === "base" ? "text-gray-700 dark:text-gray-300" : "text-green-700 dark:text-green-400"}`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)} Case
                </h3>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span
                  className={
                    type === "bear"
                      ? "text-red-600 dark:text-red-400"
                      : type === "base"
                        ? "text-gray-600 dark:text-gray-400"
                        : "text-green-600 dark:text-green-400"
                  }
                >
                  {data.growth}%
                </span>
                {type === "bear" ? (
                  <TrendingDown size={14} className="text-red-500" />
                ) : (
                  <TrendingUp
                    size={14}
                    className={
                      type === "base" ? "text-gray-500" : "text-green-500"
                    }
                  />
                )}
              </div>
            </div>
            <p
              className={`text-sm ${type === "bear" ? "text-red-600 dark:text-red-300" : type === "base" ? "text-gray-600 dark:text-gray-400" : "text-green-600 dark:text-green-300"}`}
            >
              {data.description}
            </p>
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500 dark:text-gray-400">
                  Confidence Level
                </span>
                <span
                  className={
                    type === "bear"
                      ? "text-red-600 dark:text-red-400"
                      : type === "base"
                        ? "text-gray-600 dark:text-gray-400"
                        : "text-green-600 dark:text-green-400"
                  }
                >
                  {data.confidence}%
                </span>
              </div>
              <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: `${data.confidence}%`,
                  }}
                  transition={{
                    duration: 1,
                    ease: "easeOut",
                  }}
                  className={`h-full rounded-full ${type === "bear" ? "bg-red-500" : type === "base" ? "bg-gray-500" : "bg-green-500"}`}
                />
              </div>
            </div>
            <AnimatePresence>
              {activePrediction === type && (
                <motion.div
                  initial={{
                    height: 0,
                    opacity: 0,
                  }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600"
                >
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Key Metrics
                      </h4>
                      <div className="grid grid-cols-3 gap-2">
                        {Object.entries(data.keyMetrics).map(
                          ([metric, value]) => (
                            <div
                              key={metric}
                              className="p-2 bg-gray-100 dark:bg-gray-700/50 rounded-lg"
                            >
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {metric.charAt(0).toUpperCase() +
                                  metric.slice(1)}
                              </div>
                              <div className="font-medium text-gray-900 dark:text-gray-100">
                                {value}
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">
                          Risks
                        </h4>
                        <ul className="space-y-1">
                          {data.risks.map((risk, index) => (
                            <li
                              key={index}
                              className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2"
                            >
                              <span className="w-1 h-1 bg-red-500 rounded-full" />
                              {risk}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">
                          Opportunities
                        </h4>
                        <ul className="space-y-1">
                          {data.opportunities.map((opportunity, index) => (
                            <li
                              key={index}
                              className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2"
                            >
                              <span className="w-1 h-1 bg-green-500 rounded-full" />
                              {opportunity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
