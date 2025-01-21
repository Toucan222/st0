import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  MessageSquare,
  TrendingUp,
  Activity,
  BarChart2,
  ThumbsUp,
  Clock,
  Plus,
  MessagesSquare,
  PieChart,
} from "lucide-react";
import { GroupAnalysis } from "./GroupAnalysis";
import { GroupDiscussions } from "./GroupDiscussions";
export const GroupInsights = () => {
  const [activeGroup, setActiveGroup] = useState("tech-enthusiasts");
  const [activeTab, setActiveTab] = useState("overview");
  const groups = [
    {
      id: "tech-enthusiasts",
      name: "Tech Enthusiasts",
      members: 8,
      activity: "high",
      stocks: ["AAPL", "MSFT", "GOOGL"],
      recentActivity: [
        {
          type: "analysis",
          user: "Sarah K.",
          content: "Added technical analysis for AAPL",
          time: "2h ago",
        },
        {
          type: "discussion",
          user: "Mike R.",
          content: "Started discussion on AI implications",
          time: "4h ago",
        },
      ],
    },
    {
      id: "value-investors",
      name: "Value Investors",
      members: 12,
      activity: "medium",
      stocks: ["BRK.B", "JPM", "PG"],
      recentActivity: [
        {
          type: "analysis",
          user: "John D.",
          content: "Updated value metrics for JPM",
          time: "1h ago",
        },
      ],
    },
  ];
  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: PieChart,
    },
    {
      id: "analysis",
      label: "Analysis",
      icon: BarChart2,
    },
    {
      id: "discussions",
      label: "Discussions",
      icon: MessagesSquare,
    },
  ];
  const selectedGroup = groups.find((g) => g.id === activeGroup);
  return (
    <div className="p-6">
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        {groups.map((group) => (
          <button
            key={group.id}
            onClick={() => setActiveGroup(group.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all whitespace-nowrap
              ${activeGroup === group.id ? "bg-purple-500 text-white shadow-lg shadow-purple-500/20" : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300"}`}
          >
            <Users size={16} />
            {group.name}
            <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs">
              {group.members}
            </span>
          </button>
        ))}
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-purple-500 hover:text-purple-500 transition-colors">
          <Plus size={16} />
          New Group
        </button>
      </div>
      <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors relative
              ${activeTab === tab.id ? "text-purple-500 dark:text-purple-400" : "text-gray-500 dark:text-gray-400"}`}
          >
            <tab.icon size={16} />
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeGroupTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"
                initial={false}
              />
            )}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
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
            y: -10,
          }}
          transition={{
            duration: 0.2,
          }}
        >
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                    <Activity size={14} />
                    Group Activity
                  </div>
                  <div className="text-2xl font-semibold dark:text-white">
                    High
                  </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                    <TrendingUp size={14} />
                    Success Rate
                  </div>
                  <div className="text-2xl font-semibold dark:text-white">
                    76%
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {selectedGroup?.recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex items-start gap-3"
                    >
                      {activity.type === "analysis" ? (
                        <BarChart2
                          size={16}
                          className="text-purple-500 mt-0.5"
                        />
                      ) : (
                        <MessageSquare
                          size={16}
                          className="text-blue-500 mt-0.5"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium dark:text-white">
                            {activity.user}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <Clock size={12} />
                            {activity.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {activity.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Group Watchlist
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {selectedGroup?.stocks.map((stock) => (
                    <div
                      key={stock}
                      className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center"
                    >
                      <div className="font-medium dark:text-white mb-1">
                        {stock}
                      </div>
                      <div className="text-xs text-green-500 flex items-center justify-center gap-1">
                        <TrendingUp size={12} />
                        +2.4%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeTab === "analysis" && <GroupAnalysis />}
          {activeTab === "discussions" && <GroupDiscussions />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
