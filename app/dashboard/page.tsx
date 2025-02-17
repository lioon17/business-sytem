"use client";

import { useState } from "react";
import { Sidebar } from "../components/sidebar";
import { Header } from "../components/header";
import { Analytics } from "../components/analytics";
import { TrendsChart } from "../components/trends-chart";
import { StatsCards } from "../components/stats-cards";
import { InventoryTable } from "../components/inventory-table";
import SalesManagement from "../components/sales-management";

 // ✅ Import SalesManagement Component
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("dashboard"); // Default section

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar onSelectSection={setActiveSection} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Header />
        <div className="p-6 space-y-6">

          {/* Dashboard Section (Default) */}
          <div style={{ display: activeSection === "dashboard" ? "block" : "none" }}>
            {/* Row layout for Analytics and TrendsChart */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Analytics />
              <TrendsChart />
            </div>

            {/* Summary Stats */}
            <StatsCards />

            {/* Inventory Management Section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Inventory Management</h2>
              <ul className="space-y-2">
                <li><Link href="/inventory/products" className="text-blue-600 dark:text-blue-400">Manage Products</Link></li>
                <li><Link href="/inventory/stock" className="text-blue-600 dark:text-blue-400">Stock Levels</Link></li>
              </ul>
            </div>

            {/* Sales Transactions Section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Sales Transactions</h2>
              <Link href="/sales/transactions" className="text-blue-600 dark:text-blue-400">View Transactions</Link>
            </div>
          </div>

          {/* Inventory Section */}
          <div style={{ display: activeSection === "inventory" ? "block" : "none" }}>
            <h1 className="text-2xl font-bold">Inventory Management</h1>
            <InventoryTable />
          </div>

         {/* ✅ Sales Management Section */}
         {activeSection === "salesManagement" && (
            <>
              <h1 className="text-2xl font-bold">Sales Management</h1>
              <SalesManagement />
            </>
          )}

          {/* Other Sections */}
          <div style={{ display: activeSection === "analytics" ? "block" : "none" }}>
            <h1 className="text-2xl font-bold">Business Analytics</h1>
            <p>View business insights and reports.</p>
          </div>

          <div style={{ display: activeSection === "sales" ? "block" : "none" }}>
            <h1 className="text-2xl font-bold">Sales Reports</h1>
            <p>View sales performance and history.</p>
          </div>

        </div>
      </main>
    </div>
  );
}
