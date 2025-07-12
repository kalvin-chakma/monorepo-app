import React from "react";
import { IoMdHome } from "react-icons/io";
import { FcMoneyTransfer } from "react-icons/fc";
import { GrTransaction } from "react-icons/gr";

const navItems = [
  { label: "Home", icon: <IoMdHome /> },
  { label: "Transfer", icon: <FcMoneyTransfer /> },
  { label: "Transactions", icon: <GrTransaction /> },
];

export const Sidebar = () => {
  return (
    <div className="w-[25vh] h-screen p-2 space-y-2 border-r border-gray-300">
      {navItems.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-2 hover:bg-gray-200 py-1.5 px-6 text-sm rounded cursor-pointer font-semibold"
        >
          {item.icon}
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};
