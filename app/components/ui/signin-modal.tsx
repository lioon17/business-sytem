"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function LoginModal({ onClose }: { onClose?: () => void }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Login successful! Redirecting...");
        setTimeout(() => {
          window.location.href = "/dashboard";  // Redirect on success
        }, 2000);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md relative p-6">
        {/* Close Button */}
        {onClose && (
          <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        )}

        {/* Title */}
        <h2 className="text-center text-2xl font-semibold mb-8 text-black">Login to Website</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-black"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-black "
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />

          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg">
            Login Now
          </button>

          {message && <p className="text-center text-red-500">{message}</p>}
        </form>
      </div>
    </div>
  );
}
