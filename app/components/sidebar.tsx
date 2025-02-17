"use client";

import { useState } from "react";
import {
  BarChart3,
  Users,
  Building2,
  Receipt,
  TrendingUp,
  ClipboardList,
  Calculator,
  Calendar,
  UserPlus,
  GraduationCap,
} from "lucide-react";

export function Sidebar({ onSelectSection }: { onSelectSection: (section: string) => void }) {
  const [activeSection, setActiveSection] = useState("dashboard"); // Default section

  const menuItems = [
    { title: "Dashboard", icon: BarChart3, section: "dashboard" },
    { title: "Inventory", icon: Users, section: "inventory" },
    { title: "Sales Report", icon: TrendingUp, section: "sales" },
    { title: "Sales management", icon: Building2, section: "salesManagement" },
    { title: "Companies", icon: Building2, section: "companies" },
    { title: "Transaction", icon: Receipt, section: "transaction" },
   
    { title: "Task", icon: ClipboardList, section: "task" },
    { title: "Accounting", icon: Calculator, section: "accounting" },
    { title: "Calendar", icon: Calendar, section: "calendar" },
    { title: "Recruitment", icon: UserPlus, section: "recruitment" },
    { title: "Training", icon: GraduationCap, section: "training" },
  ];

  return (
    <div className="flex flex-col w-64 bg-[#0A1A3B] text-white h-screen">
      <div className="p-4 border-b border-white/10">
        <h1 className="text-xl font-semibold">MagerCRM</h1>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => (
            <button
              key={item.section}
              onClick={() => {
                setActiveSection(item.section);
                onSelectSection(item.section);
              }}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left ${
                activeSection === item.section ? "bg-white/10" : "hover:bg-white/5"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
