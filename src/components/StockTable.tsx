import React, { useEffect, useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  SlidersHorizontal,
  TrendingUp,
  Info,
  Check,
  BarChart2,
  DollarSign,
  X,
  Zap,
  Star,
  Flame,
  Trophy,
  Globe,
  Diamond,
  TrendingDown,
  Filter,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
export const StockTable = ({ onSelectStock }) => {
  const [sortBy, setSortBy] = useState("change");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStocks, setSelectedStocks] = useState(new Set());
  const [showTooltip, setShowTooltip] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [showSearch, setShowSearch] = useState(false);
  const stocks = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      change: 2.3,
      volume: "52.3M",
      marketCap: "2.8T",
      sentiment: "bullish",
      pe: 28.5,
      volatility: "low",
      insights: "Strong product pipeline and services growth",
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corporation",
      change: -1.4,
      volume: "48.1M",
      marketCap: "2.1T",
      sector: "Technology",
      sentiment: "neutral",
      pe: 32.1,
      volatility: "medium",
      insights: "Cloud segment shows continued momentum",
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      change: 3.2,
      volume: "33.7M",
      marketCap: "1.9T",
      sector: "Technology",
      sentiment: "bullish",
      pe: 25.8,
      volatility: "low",
      insights: "AI initiatives driving growth",
    },
    {
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      change: 1.8,
      volume: "45.2M",
      marketCap: "1.7T",
      sector: "Consumer Cyclical",
      sentiment: "bullish",
      pe: 62.4,
      volatility: "medium",
      insights: "E-commerce and AWS showing strong performance",
    },
  ];
  const sortOptions = [
    {
      id: "change",
      label: "Price Change",
      icon: TrendingUp,
    },
    {
      id: "marketCap",
      label: "Market Cap",
      icon: DollarSign,
    },
    {
      id: "volume",
      label: "Volume",
      icon: BarChart2,
    },
  ];
  const filterIcons = [
    {
      id: "all",
      icon: BarChart2,
      label: "All",
      color: "text-white",
    },
    {
      id: "gainers",
      icon: TrendingUp,
      label: "Gainers",
      color: "text-green-400",
    },
    {
      id: "losers",
      icon: TrendingDown,
      label: "Losers",
      color: "text-red-400",
    },
    {
      id: "active",
      icon: Zap,
      label: "Active",
      color: "text-yellow-400",
    },
    {
      id: "favorites",
      icon: Star,
      label: "Favorites",
      color: "text-purple-400",
    },
    {
      id: "hot",
      icon: Flame,
      label: "Hot",
      color: "text-orange-400",
    },
  ];
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);
  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-800 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-6 w-20 bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-32 bg-gray-700 rounded animate-pulse" />
              </div>
              <div className="h-8 w-16 bg-gray-700 rounded animate-pulse" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="h-16 bg-gray-700 rounded animate-pulse" />
              <div className="h-16 bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  const filteredStocks = stocks.filter((stock) => {
    const matchesSearch = searchQuery
      ? stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesFilter = (() => {
      switch (activeFilter) {
        case "gainers":
          return stock.change > 0;
        case "losers":
          return stock.change < 0;
        case "active":
          return parseFloat(stock.volume) > 40;
        // Consider high volume stocks as active
        case "favorites":
          return selectedStocks.has(stock.symbol);
        case "hot":
          return stock.sentiment === "bullish";
        default:
          return true;
      }
    })();
    return matchesSearch && matchesFilter;
  });
  const sortedStocks = [...filteredStocks].sort((a, b) => {
    const sortValue = (() => {
      switch (sortBy) {
        case "change":
          return sortOrder === "asc"
            ? a.change - b.change
            : b.change - a.change;
        case "marketCap":
          const aMarketCap = parseFloat(a.marketCap.replace("T", "")) * 1000;
          const bMarketCap = parseFloat(b.marketCap.replace("T", "")) * 1000;
          return sortOrder === "asc"
            ? aMarketCap - bMarketCap
            : bMarketCap - aMarketCap;
        case "volume":
          const aVolume = parseFloat(a.volume.replace("M", ""));
          const bVolume = parseFloat(b.volume.replace("M", ""));
          return sortOrder === "asc" ? aVolume - bVolume : bVolume - aVolume;
        default:
          return 0;
      }
    })();
    return sortValue;
  });
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="fixed top-[72px] left-0 right-0 z-20 bg-gray-900/95 backdrop-blur-xl max-w-md mx-auto">
        <div className="p-4 space-y-4 border-b border-gray-800">
          <div className="flex items-center justify-between gap-4">
            <AnimatePresence mode="wait">
              {showSearch ? (
                <motion.div
                  initial={{
                    opacity: 0,
                    width: 0,
                  }}
                  animate={{
                    opacity: 1,
                    width: "100%",
                  }}
                  exit={{
                    opacity: 0,
                    width: 0,
                  }}
                  className="relative flex-1"
                >
                  <input
                    type="text"
                    placeholder="Search stocks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-11 px-4 py-2 pl-11 bg-gray-800 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-gray-700/50"
                  />
                  <Search
                    className="absolute left-4 top-3 text-gray-500"
                    size={18}
                  />
                  <button
                    onClick={() => setShowSearch(false)}
                    className="absolute right-3 top-3 text-gray-400"
                  >
                    <X size={18} />
                  </button>
                </motion.div>
              ) : (
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
                  className="flex items-center gap-2"
                >
                  <h1 className="text-lg font-semibold text-white">
                    All Stocks
                  </h1>
                  <span className="px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 text-sm">
                    {filteredStocks.length}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex items-center gap-2">
              {!showSearch && (
                <motion.button
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={() => setShowSearch(true)}
                  className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
                >
                  <Search size={20} />
                </motion.button>
              )}
              <motion.button
                whileTap={{
                  scale: 0.95,
                }}
                onClick={() => setShowFilters(true)}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
              >
                <Filter size={20} />
              </motion.button>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 hide-scrollbar">
            {filterIcons.map((filter) => (
              <motion.button
                key={filter.id}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all whitespace-nowrap
                  ${activeFilter === filter.id ? "bg-purple-500 text-white border-purple-500" : "border-gray-700 text-gray-400 hover:border-gray-600"}`}
              >
                <filter.icon size={16} />
                <span className="text-sm font-medium">{filter.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
      <div className="pt-[180px] pb-20 px-4 space-y-3">
        {sortedStocks.map((stock) => (
          <motion.div
            key={stock.symbol}
            layout
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={() => onSelectStock(stock)}
            className="bg-gray-800 rounded-xl border border-gray-700/50 overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gray-700 flex items-center justify-center text-lg font-bold text-white">
                    {stock.symbol[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-white">
                        {stock.symbol}
                      </span>
                      <div
                        className={`flex items-center gap-1 text-sm font-medium px-2 py-0.5 rounded-lg
                        ${stock.change >= 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
                      >
                        {stock.change >= 0 ? (
                          <ArrowUpRight size={14} />
                        ) : (
                          <ArrowDownRight size={14} />
                        )}
                        {Math.abs(stock.change)}%
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">{stock.name}</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-700/50 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Market Cap</div>
                  <div className="font-medium text-white">
                    {stock.marketCap}
                  </div>
                </div>
                <div className="p-3 bg-gray-700/50 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Volume</div>
                  <div className="font-medium text-white">{stock.volume}</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {showFilters && (
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
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowFilters(false)}
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
              className="fixed inset-x-0 bottom-0 bg-gray-800 rounded-t-xl z-50 p-4 pb-8 space-y-4 max-w-md mx-auto"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  Sort & Filter
                </h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-gray-700 rounded-lg"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>
              <div className="grid gap-2">
                {sortOptions.map((option) => (
                  <motion.button
                    key={option.id}
                    whileTap={{
                      scale: 0.98,
                    }}
                    onClick={() => {
                      if (sortBy === option.id) {
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      } else {
                        setSortBy(option.id);
                        setSortOrder("desc");
                      }
                      setShowFilters(false);
                    }}
                    className={`flex items-center justify-between p-4 rounded-xl transition-colors
                      ${sortBy === option.id ? "bg-purple-500 text-white" : "bg-gray-700 text-gray-300"}`}
                  >
                    <div className="flex items-center gap-3">
                      <option.icon size={18} />
                      <span className="font-medium">{option.label}</span>
                    </div>
                    {sortBy === option.id && (
                      <ChevronUp
                        size={18}
                        className={`transition-transform ${sortOrder === "desc" ? "rotate-180" : ""}`}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
