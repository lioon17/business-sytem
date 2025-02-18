"use client";

import { useState, ChangeEvent } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: any) => void;
}

export function AddProductModal({ isOpen, onClose, onAddProduct }: AddProductModalProps) {
  const [newProduct, setNewProduct] = useState({
    id: crypto.randomUUID(),
    name: "",
    category: "Electronics",
    price: "",
    stock: "",
    supplier: "",
    status: "In Stock",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle text input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setNewProduct((prev) => ({
      ...prev,
      [id]: id === "price" || id === "stock" ? parseFloat(value) || "" : value,
    }));
  };
  

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.supplier) {
      setError("⚠ Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const data = await response.json();
      onAddProduct(data); // Update inventory table
      onClose(); // Close modal

      setNewProduct({
        id: crypto.randomUUID(),
        name: "",
        category: "Electronics",
        price: "",
        stock: "",
        supplier: "",
        status: "In Stock",
      });
    } catch (err) {
      setError("❌ Something went wrong. Try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <div className="text-black text-lg font-semibold">
            <DialogTitle>Add New Product</DialogTitle>
          </div>
        </DialogHeader>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" value={newProduct.name} onChange={handleChange} placeholder="e.g., Wireless Keyboard" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={newProduct.status} onValueChange={(value) => setNewProduct({ ...newProduct, status: value })}>
                <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="In Stock" onSelect={() => setNewProduct({ ...newProduct, status: "In Stock" })}>
                    In Stock
                    </SelectItem>
                    <SelectItem value="Low Stock" onSelect={() => setNewProduct({ ...newProduct, status: "Low Stock" })}>
                    Low Stock
                    </SelectItem>
                    <SelectItem value="Out of Stock" onSelect={() => setNewProduct({ ...newProduct, status: "Out of Stock" })}>
                    Out of Stock
                    </SelectItem>
                </SelectContent>
                </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input id="price" type="number" value={newProduct.price} onChange={handleChange} placeholder="e.g., 59.99" step="0.01" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stock">Stock Quantity</Label>
            <Input id="stock" type="number" value={newProduct.stock} onChange={handleChange} placeholder="e.g., 100" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="supplier">Supplier</Label>
            <Input id="supplier" value={newProduct.supplier} onChange={handleChange} placeholder="e.g., Tech Supplies Inc." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={newProduct.category} onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}>
                <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Electronics" onSelect={() => setNewProduct({ ...newProduct, category: "Electronics" })}>
                    Electronics
                    </SelectItem>
                    <SelectItem value="Furniture" onSelect={() => setNewProduct({ ...newProduct, category: "Furniture" })}>
                    Furniture
                    </SelectItem>
                    <SelectItem value="Accessories" onSelect={() => setNewProduct({ ...newProduct, category: "Accessories" })}>
                    Accessories
                    </SelectItem>
                </SelectContent>
                </Select>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Adding..." : "Add Product"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
