"use client";

import { useState, ChangeEvent } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import type { InventoryItem } from "@/app/types/inventory"; // Adjust path if needed



// ✅ Define a Product type
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  supplier: string;
  status: string;
}

interface EditProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: InventoryItem; // ✅ Change this if it was Product
    onUpdateProduct: (updatedProduct: InventoryItem) => void;
  }
  

export function EditProductModal({ isOpen, onClose, product, onUpdateProduct }: EditProductModalProps) {
  const [updatedProduct, setUpdatedProduct] = useState<Product>({ ...product });

  // ✅ Handle input changes with correct type
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [id]: id === "price" || id === "stock" ? (value ? parseFloat(value) : prev[id]) : value,
    }));
  };

  // ✅ Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const res = await fetch("/api/inventory", {
        method: "PUT", // ✅ Use PUT to update the product
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update product");
      }
  
      const data = await res.json();
      onUpdateProduct(data); // ✅ Update parent state
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
  
      // ✅ TypeScript-safe error handling
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred.");
      }
    }
  };
  

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
      <DialogHeader>
            <div className="text-black">
                <DialogTitle>Edit Product</DialogTitle>
            </div>
            </DialogHeader>


        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          {/* Product Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" value={updatedProduct.name} onChange={handleChange} />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={updatedProduct.category}
              onValueChange={(value) => setUpdatedProduct((prev) => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Furniture">Furniture</SelectItem>
                <SelectItem value="Accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input id="price" type="number" value={updatedProduct.price} onChange={handleChange} step="0.01" />
          </div>

          {/* Stock */}
          <div className="space-y-2">
            <Label htmlFor="stock">Stock Quantity</Label>
            <Input id="stock" type="number" value={updatedProduct.stock} onChange={handleChange} />
          </div>

          {/* Supplier */}
          <div className="space-y-2">
            <Label htmlFor="supplier">Supplier</Label>
            <Input id="supplier" value={updatedProduct.supplier} onChange={handleChange} />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={updatedProduct.status}
              onValueChange={(value) => setUpdatedProduct((prev) => ({ ...prev, status: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="In Stock">In Stock</SelectItem>
                <SelectItem value="Low Stock">Low Stock</SelectItem>
                <SelectItem value="Out of Stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Update Product
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
