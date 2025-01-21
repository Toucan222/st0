import React, { useState } from "react";
import {
  User,
  LogOut,
  Settings,
  ChevronDown,
  Users,
  BarChart2,
  PlusCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
export const UserMenu = ({ user }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const portfolios = [
    {
      id: 1,
      name: "Tech Stocks",
      stocks: ["AAPL", "MSFT", "GOOGL"],
      members: 3,
    },
    {
      id: 2,
      name: "Green Energy",
      stocks: ["TSLA", "ENPH", "SEDG"],
      members: 5,
    },
    {
      id: 3,
      name: "AI & ML",
      stocks: ["NVDA", "AMD", "PLTR"],
      members: 4,
    },
  ];
  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
          {user.name[0]}
        </div>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${showMenu ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {showMenu && (
          <>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
              }}
              className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="font-medium dark:text-white">{user.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {user.email}
                </div>
              </div>
              <div className="p-2">
                <button
                  onClick={() => setShowPortfolio(true)}
                  className="flex items-center gap-3 w-full p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <div size={16} />
                  <span>My Portfolios</span>
                  <span className="ml-auto bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs px-2 py-1 rounded-full">
                    {portfolios.length}
                  </span>
                </button>
                <button className="flex items-center gap-3 w-full p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Users size={16} />
                  <span>Group Insights</span>
                </button>
                <button className="flex items-center gap-3 w-full p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Settings size={16} />
                  <span>Settings</span>
                </button>
                <div className="my-2 border-t border-gray-200 dark:border-gray-700" />
                <button className="flex items-center gap-3 w-full p-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </motion.div>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowMenu(false)}
            />
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showPortfolio && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
              }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden"
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-lg font-semibold dark:text-white">
                  My Portfolios
                </h2>
                <button
                  onClick={() => setShowPortfolio(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>
              <div className="p-4 overflow-y-auto">
                <button className="flex items-center gap-3 w-full p-3 mb-4 text-sm text-purple-600 dark:text-purple-400 border-2 border-dashed border-purple-200 dark:border-purple-900/50 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors">
                  <PlusCircle size={16} />
                  <span>Create New Portfolio</span>
                </button>
                <div className="space-y-3">
                  {portfolios.map((portfolio) => (
                    <div
                      key={portfolio.id}
                      className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium dark:text-white">
                            {portfolio.name}
                          </h3>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {portfolio.stocks.join(", ")}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <Users size={14} />
                          {portfolio.members}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <BarChart2 size={14} className="text-purple-500" />
                        <div className="text-sm text-purple-600 dark:text-purple-400">
                          View Analysis
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
