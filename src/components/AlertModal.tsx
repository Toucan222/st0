import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bell, X, DollarSign, ArrowUp, ArrowDown } from "lucide-react";
const AlertModal = ({ stock, onClose, onSave }) => {
  const [alertType, setAlertType] = useState("above");
  const [price, setPrice] = useState(stock.price);
  return (
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
        onClick={onClose}
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
        className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-gray-800 rounded-t-xl z-50 p-4"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Set Price Alert</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setAlertType("above")}
              className={`flex-1 p-3 rounded-lg border ${alertType === "above" ? "bg-green-500/20 border-green-500" : "border-gray-700"}`}
            >
              <ArrowUp size={18} className="text-green-500 mx-auto" />
            </button>
            <button
              onClick={() => setAlertType("below")}
              className={`flex-1 p-3 rounded-lg border ${alertType === "below" ? "bg-red-500/20 border-red-500" : "border-gray-700"}`}
            >
              <ArrowDown size={18} className="text-red-500 mx-auto" />
            </button>
          </div>
          <div className="relative">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 pl-8 bg-gray-700 rounded-lg text-white"
            />
            <DollarSign
              size={16}
              className="absolute left-3 top-3.5 text-gray-400"
            />
          </div>
          <button
            onClick={() =>
              onSave({
                type: alertType,
                price,
              })
            }
            className="w-full p-3 bg-purple-500 text-white rounded-lg"
          >
            Create Alert
          </button>
        </div>
      </motion.div>
    </>
  );
};
export default AlertModal;
