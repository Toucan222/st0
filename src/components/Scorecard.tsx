import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Info,
  AlertTriangle,
  CheckCircle,
  BarChart2,
  PieChart,
  Activity,
  Target,
  Globe,
  Users,
  Lock,
  Zap,
} from "lucide-react";
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";
export const Scorecard = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState("category");
  const [timeframe, setTimeframe] = useState("1m");
  const [view, setView] = useState("list");
  const [showBenchmarks, setShowBenchmarks] = useState(false);
  const scores = [
    {
      category: "Technical Analysis",
      score: 85,
      trend: "up",
      change: +5,
      details: "Strong momentum indicators and positive chart patterns",
      history: [80, 82, 79, 85, 83, 87, 85],
      status: "positive",
      group: "market",
      industryAvg: 72,
      confidence: 90,
      metrics: {
        momentum: 88,
        volatility: 65,
        trend: 92,
      },
    },
    {
      category: "Market Sentiment",
      score: 72,
      trend: "down",
      change: -3,
      details: "Slight decrease in institutional investor confidence",
      history: [75, 73, 74, 72, 71, 73, 72],
      status: "neutral",
      group: "market",
      industryAvg: 68,
      confidence: 85,
      metrics: {
        socialSentiment: 70,
        newsImpact: 74,
        institutionalSentiment: 72,
      },
    },
    {
      category: "Financial Health",
      score: 88,
      trend: "up",
      change: +2,
      details: "Strong balance sheet with improving cash flow metrics",
      history: [84, 85, 86, 87, 88, 88, 88],
      status: "positive",
      group: "fundamental",
      industryAvg: 75,
      confidence: 95,
      metrics: {
        liquidityRatio: 90,
        debtEquity: 85,
        cashFlow: 89,
      },
    },
    {
      category: "Growth Potential",
      score: 92,
      trend: "up",
      change: +4,
      details: "Exceptional revenue growth and market expansion opportunities",
      history: [86, 88, 89, 90, 91, 92, 92],
      status: "positive",
      group: "growth",
      industryAvg: 70,
      confidence: 88,
      metrics: {
        revenueGrowth: 94,
        marketExpansion: 90,
        productDevelopment: 92,
      },
    },
    {
      category: "Competitive Position",
      score: 83,
      trend: "up",
      change: +1,
      details: "Strong market share with growing competitive advantages",
      history: [80, 81, 82, 82, 83, 83, 83],
      status: "positive",
      group: "market",
      industryAvg: 65,
      confidence: 87,
      metrics: {
        marketShare: 85,
        brandStrength: 82,
        competitiveAdvantage: 82,
      },
    },
    {
      category: "Innovation Metrics",
      score: 90,
      trend: "up",
      change: +3,
      details: "Leading R&D initiatives and strong patent portfolio",
      history: [85, 86, 87, 88, 89, 90, 90],
      status: "positive",
      group: "growth",
      industryAvg: 68,
      confidence: 92,
      metrics: {
        rdInvestment: 92,
        patentStrength: 89,
        innovationPipeline: 89,
      },
    },
    {
      category: "Risk Assessment",
      score: 78,
      trend: "down",
      change: -2,
      details: "Moderate market risks with strong mitigation strategies",
      history: [81, 80, 79, 78, 78, 78, 78],
      status: "neutral",
      group: "risk",
      industryAvg: 72,
      confidence: 85,
      metrics: {
        marketRisk: 75,
        operationalRisk: 80,
        regulatoryRisk: 79,
      },
    },
    {
      category: "Management Quality",
      score: 87,
      trend: "up",
      change: +2,
      details: "Experienced leadership team with strong execution track record",
      history: [83, 84, 85, 86, 86, 87, 87],
      status: "positive",
      group: "fundamental",
      industryAvg: 70,
      confidence: 90,
      metrics: {
        executionTrackRecord: 88,
        strategicPlanning: 86,
        corporateGovernance: 87,
      },
    },
    {
      category: "ESG Performance",
      score: 82,
      trend: "up",
      change: +3,
      details: "Strong environmental initiatives and governance practices",
      history: [77, 78, 79, 80, 81, 82, 82],
      status: "positive",
      group: "risk",
      industryAvg: 65,
      confidence: 88,
      metrics: {
        environmental: 84,
        social: 80,
        governance: 82,
      },
    },
    {
      category: "Valuation Metrics",
      score: 76,
      trend: "down",
      change: -1,
      details: "Reasonable valuation with potential upside opportunities",
      history: [78, 77, 77, 76, 76, 76, 76],
      status: "neutral",
      group: "fundamental",
      industryAvg: 70,
      confidence: 83,
      metrics: {
        peRatio: 75,
        priceToBook: 77,
        evEbitda: 76,
      },
    },
  ];
  const scoreGroups = {
    market: {
      name: "Market Performance",
      icon: Globe,
      description: "Market position and competitive dynamics",
    },
    fundamental: {
      name: "Fundamental Analysis",
      icon: BarChart2,
      description: "Financial health and valuation metrics",
    },
    risk: {
      name: "Risk & Compliance",
      icon: AlertTriangle,
      description: "Risk assessment and regulatory compliance",
    },
    growth: {
      name: "Growth & Innovation",
      icon: TrendingUp,
      description: "Growth potential and innovation metrics",
    },
  };
  const timeframes = [
    {
      value: "1w",
      label: "1 Week",
    },
    {
      value: "1m",
      label: "1 Month",
    },
    {
      value: "3m",
      label: "3 Months",
    },
    {
      value: "6m",
      label: "6 Months",
    },
    {
      value: "1y",
      label: "1 Year",
    },
  ];
  const averageScore = useMemo(() => {
    return Math.round(
      scores.reduce((acc, score) => acc + score.score, 0) / scores.length,
    );
  }, [scores]);
  const industryAverageScore = useMemo(() => {
    return Math.round(
      scores.reduce((acc, score) => acc + score.industryAvg, 0) / scores.length,
    );
  }, [scores]);
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <motion.div
        className="relative p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50 overflow-hidden"
        initial={{
          y: 20,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent" />
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  Performance Scorecard
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.5,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    className="flex items-center"
                  >
                    <div className="relative">
                      <Info size={16} className="text-gray-400 cursor-help" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-xs text-gray-300 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Overall performance score based on multiple metrics
                      </div>
                    </div>
                  </motion.div>
                </h2>
                <div className="flex items-baseline gap-3 mt-4">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 drop-shadow-glow">
                    {averageScore}%
                  </div>
                  <div className="flex items-center text-sm bg-gray-800/50 px-3 py-1 rounded-full">
                    <motion.span
                      className={`flex items-center gap-1 font-medium
                      ${averageScore > industryAverageScore ? "text-green-400" : "text-red-400"}`}
                      initial={{
                        opacity: 0,
                        x: -10,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 0.2,
                      }}
                    >
                      {averageScore > industryAverageScore ? (
                        <TrendingUp size={14} />
                      ) : (
                        <TrendingDown size={14} />
                      )}
                      {Math.abs(averageScore - industryAverageScore)}% vs
                      Industry
                    </motion.span>
                  </div>
                </div>
              </div>
              <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-gray-700/50 to-transparent" />
              <motion.div
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.1,
                }}
                className="shrink-0"
              >
                <div className="text-sm text-gray-400 mb-2">
                  Confidence Score
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-green-400">
                    {Math.round(
                      scores.reduce((acc, score) => acc + score.confidence, 0) /
                        scores.length,
                    )}
                    %
                  </div>
                  <Target size={20} className="text-green-400" />
                </div>
              </motion.div>
            </div>
            <div className="h-1 w-full bg-gray-700/50 rounded-full overflow-hidden">
              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: `${averageScore}%`,
                }}
                transition={{
                  delay: 0.3,
                  duration: 1,
                }}
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              />
            </div>
          </div>
        </div>
      </motion.div>
      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 gap-4"
            : "space-y-4"
        }
      >
        {Object.entries(scoreGroups).map(([groupKey, { name, icon: Icon }]) => (
          <motion.div
            key={groupKey}
            className="space-y-3"
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              <Icon size={16} />
              <h3>{name}</h3>
            </div>
            {scores
              .filter((score) => score.group === groupKey)
              .map((item) => (
                <motion.div
                  key={item.category}
                  layout
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className={`p-4 rounded-lg transition-all cursor-pointer
                    ${view === "grid" ? "h-full" : ""}
                    ${selectedCategory === item.category ? "bg-purple-50 dark:bg-purple-900/20 ring-1 ring-purple-500" : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50"}`}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === item.category ? null : item.category,
                    )
                  }
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium dark:text-white">
                          {item.category}
                        </span>
                        <span
                          className={`text-sm flex items-center gap-1
                          ${item.trend === "up" ? "text-green-500" : "text-red-500"}`}
                        >
                          {item.trend === "up" ? (
                            <TrendingUp size={14} />
                          ) : (
                            <TrendingDown size={14} />
                          )}
                          {Math.abs(item.change)}%
                        </span>
                      </div>
                      <div className="h-8 mb-2">
                        <Sparklines data={item.history} margin={6}>
                          <SparklinesLine
                            style={{
                              stroke:
                                item.trend === "up" ? "#22c55e" : "#ef4444",
                              strokeWidth: 2,
                              fill: "none",
                            }}
                          />
                          <SparklinesSpots
                            size={2}
                            style={{
                              stroke:
                                item.trend === "up" ? "#22c55e" : "#ef4444",
                              strokeWidth: 2,
                              fill: "white",
                            }}
                          />
                        </Sparklines>
                      </div>
                      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{
                            width: 0,
                          }}
                          animate={{
                            width: `${item.score}%`,
                          }}
                          className={`absolute h-full rounded-full ${item.score >= 80 ? "bg-green-500" : item.score >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
                        />
                        {showBenchmarks && (
                          <div
                            className="absolute h-full w-0.5 bg-gray-400"
                            style={{
                              left: `${item.industryAvg}%`,
                            }}
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-2xl font-bold text-purple-500">
                        {item.score}%
                      </div>
                      {showBenchmarks && (
                        <div className="text-sm text-gray-500">
                          Avg: {item.industryAvg}%
                        </div>
                      )}
                    </div>
                  </div>
                  <AnimatePresence>
                    {selectedCategory === item.category && (
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
                          duration: 0.2,
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 space-y-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <Info size={16} className="mt-0.5 flex-shrink-0" />
                            <p>{item.details}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            {Object.entries(item.metrics).map(
                              ([metric, value]) => (
                                <div
                                  key={metric}
                                  className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                                >
                                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                    {metric.charAt(0).toUpperCase() +
                                      metric.slice(1)}
                                  </div>
                                  <div className="font-medium text-gray-700 dark:text-gray-200">
                                    {value}%
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
          </motion.div>
        ))}
      </div>
      <motion.div
        className="fixed bottom-20 right-4 md:hidden"
        initial={{
          scale: 0,
        }}
        animate={{
          scale: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        <button
          onClick={() => setView(view === "list" ? "grid" : "list")}
          className="bg-purple-500 text-white p-3 rounded-full shadow-lg"
        >
          {view === "list" ? <PieChart size={20} /> : <BarChart2 size={20} />}
        </button>
      </motion.div>
    </div>
  );
};
