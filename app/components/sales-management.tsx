"use client";

import { useState, useEffect } from "react";

interface Sale {
  id: string;
  date: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export default function SalesManagement() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [date, setDate] = useState("");
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  // ✅ Fetch Sales from API
  useEffect(() => {
    async function fetchSales() {
      try {
        const res = await fetch("/api/sales");
        if (!res.ok) throw new Error("Failed to fetch sales");
        const data = await res.json();
        setSales(data);
      } catch (error) {
        console.error("Error fetching sales:", error);
      }
    }

    fetchSales();
  }, []);

  // ✅ Add Sale and Save to Database
  const handleAddSale = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !productId || !productName || !quantity || !price) {
      alert("All fields are required!");
      return;
    }

    const newSale = {
      date,
      productId,
      productName,
      quantity: Number(quantity),
      price: Number(price),
    };

    try {
      const res = await fetch("/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSale),
      });

      if (!res.ok) throw new Error("Failed to add sale");

      const addedSale = await res.json();
      setSales([...sales, addedSale]); // Update UI with new sale

      // Reset form
      setDate("");
      setProductId("");
      setProductName("");
      setQuantity("");
      setPrice("");
    } catch (error) {
      console.error("Error adding sale:", error);
    }
  };

  // ✅ Calculate daily total sales
  const calculateDailyTotals = () => {
    const totals: { [key: string]: number } = {};
    sales.forEach((sale) => {
      const total = sale.quantity * sale.price;
      totals[sale.date] = (totals[sale.date] || 0) + total;
    });
    return totals;
  };

  const dailyTotals = calculateDailyTotals();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Sales Management</h2>

      {/* 🟢 Sales Form */}
      <form onSubmit={handleAddSale} className="mb-8">
        <div className="grid grid-cols-2 gap-4">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full p-2 border rounded" />
          <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} placeholder="Product ID" required className="w-full p-2 border rounded" />
          <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Product Name" required className="w-full p-2 border rounded" />
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" required className="w-full p-2 border rounded" />
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} step="0.01" placeholder="Price" required className="w-full p-2 border rounded" />
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Sale</button>
      </form>

      {/* 🟢 Sales Records */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Sales Records</h3>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th>Date</th>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.date}</td>
                <td>{sale.productId}</td>
                <td>{sale.productName}</td>
                <td>{sale.quantity}</td>
                <td>${sale.price.toFixed(2)}</td>
                <td>${sale.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🟢 Daily Totals */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Daily Totals</h3>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th>Date</th>
              <th>Total Sales</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(dailyTotals).map(([date, total]) => (
              <tr key={date}>
                <td>{date}</td>
                <td>${total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
