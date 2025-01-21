import React, { useEffect, useState } from "react";
import {
  Search,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Star,
  History,
  BarChart2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
export const StockSelector = ({ selectedStock, onSelectStock }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const recentStocks = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 178.72,
      change: 2.34,
      changePercent: 1.32,
      category: "recent",
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corporation",
      price: 332.58,
      change: -1.23,
      changePercent: -0.37,
      category: "recent",
    },
    {
      symbol: "NVDA",
      name: "NVIDIA Corporation",
      price: 432.99,
      change: 5.67,
      changePercent: 1.32,
      category: "watchlist",
    },
    {
      symbol: "TSLA",
      name: "Tesla, Inc.",
      price: 238.45,
      change: 3.21,
      changePercent: 1.36,
      category: "watchlist",
    },
  ];
  const filteredStocks = recentStocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen) {
        if (e.key === "Escape") {
          setIsOpen(false);
        }
      } else if (e.metaKey && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 bg-gray-800 rounded-xl flex items-center justify-between hover:bg-gray-700/50 transition-all duration-200 border border-gray-700/50 hover:border-gray-600/50
          focus:outline-none focus:ring-2 focus:ring-purple-500/50"
      >
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
            {selectedStock.symbol[0]}
          </div>
          <div>
            <div className="font-semibold text-white flex items-center gap-2">
              {selectedStock.symbol}
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700/50 text-gray-400 font-normal">
                {selectedStock.name}
              </span>
            </div>
            <div
              className={`text-sm flex items-center gap-1 mt-0.5
              ${selectedStock.change >= 0 ? "text-green-400" : "text-red-400"}`}
            >
              {selectedStock.change >= 0 ? (
                <TrendingUp size={14} />
              ) : (
                <TrendingDown size={14} />
              )}
              ${selectedStock.price.toFixed(2)}
              <span className="text-gray-500 mx-1">•</span>
              {selectedStock.change > 0 && "+"}
              {selectedStock.change}%
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs px-2 py-1 rounded-md bg-gray-700/50 text-gray-400 hidden sm:block">
            ⌘K
          </div>
          <ChevronDown
            size={20}
            className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              transition={{
                duration: 0.2,
              }}
              className="absolute z-20 top-full left-0 right-0 mt-2 bg-gray-800 rounded-xl shadow-xl border border-gray-700/50 backdrop-blur-sm overflow-hidden"
            >
              <div className="p-2 border-b border-gray-700/50">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search stocks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className={`w-full h-10 pl-10 pr-4 bg-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all
                      ${searchFocused ? "bg-gray-700" : ""}`}
                  />
                  <Search
                    className="absolute left-3 top-2.5 text-gray-500"
                    size={20}
                  />
                </div>
              </div>
              <div className="max-h-[320px] overflow-y-auto">
                {filteredStocks.length > 0 ? (
                  <div className="p-2 grid gap-1">
                    {filteredStocks.map((stock) => (
                      <motion.button
                        key={stock.symbol}
                        onClick={() => {
                          onSelectStock(stock);
                          setIsOpen(false);
                        }}
                        className="w-full p-3 flex items-center justify-between rounded-lg hover:bg-gray-700/50 transition-colors group"
                        whileHover={{
                          x: 4,
                        }}
                        whileTap={{
                          scale: 0.98,
                        }}
                      >
                        <div className="flex items-center gap-3">
                          {stock.category === "watchlist" ? (
                            <Star size={16} className="text-yellow-500" />
                          ) : (
                            <History size={16} className="text-gray-400" />
                          )}
                          <div>
                            <div className="font-medium text-white flex items-center gap-2">
                              {stock.symbol}
                              <span className="text-xs text-gray-400">
                                {stock.name}
                              </span>
                            </div>
                            <div
                              className={`text-sm flex items-center gap-1
                              ${stock.change >= 0 ? "text-green-400" : "text-red-400"}`}
                            >
                              {stock.change >= 0 ? (
                                <TrendingUp size={14} />
                              ) : (
                                <TrendingDown size={14} />
                              )}
                              ${stock.price.toFixed(2)}
                              <span className="text-gray-500 mx-1">•</span>
                              {stock.change > 0 && "+"}
                              {stock.change}%
                            </div>
                          </div>
                        </div>
                        <BarChart2
                          size={16}
                          className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div className="text-gray-400 mb-1">No stocks found</div>
                    <div className="text-sm text-gray-500">
                      Try searching for a different symbol or name
                    </div>
                  </div>
                )}
              </div>
              <div className="p-2 border-t border-gray-700/50">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full p-2 text-sm text-gray-400 hover:text-gray-300 rounded-lg hover:bg-gray-700/50 transition-colors"
                >
                  Press ESC to close
                </button>
              </div>
            </motion.div>
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
              transition={{
                duration: 0.2,
              }}
              className="fixed inset-0 z-10 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
