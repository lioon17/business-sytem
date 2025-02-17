"use client";

import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { Badge } from "@/app/components/ui/badge";
import { Edit, Trash2, PlusCircle } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { AddProductModal } from "@/app/components/ui/add-product-modal";
import { EditProductModal } from "@/app/components/ui/edit-product-modal";

// ✅ Define the Inventory Item Type
interface InventoryItem {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  supplier: string;
  status: string;
  lastUpdated: string;
}

export function InventoryTable() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // ✅ Fix: Define showEditModal
  const [selectedProduct, setSelectedProduct] = useState<any>(null); // ✅ Fix: Define selectedProduct

  // 🟢 Fetch Inventory from API
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await fetch("/api/inventory");
        if (!res.ok) throw new Error("Failed to fetch inventory");
        const data: InventoryItem[] = await res.json();
        setInventory(data);
      } catch (error) {
        console.error("Failed to fetch inventory", error);
      }
    };
    fetchInventory();
  }, []);

  // 🗑 Delete Product from Database
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch("/api/inventory", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Failed to delete product");

      setInventory((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // ➕ Add New Product to Database
  const handleAddProduct = async (product: InventoryItem) => {
    try {
      const res = await fetch("/api/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!res.ok) throw new Error("Failed to add product");

      const newProduct: InventoryItem = await res.json();
      setInventory((prev) => [...prev, newProduct]); // ✅ Append the new product to the list
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };


  const handleUpdateProduct = (updatedProduct: any) => {
    setInventory((prev) =>
      prev.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
    );
  };

  // 🔄 Filter Inventory by Category
  const filteredInventory = selectedCategory === "All Categories"
    ? inventory
    : inventory.filter((item) => item.category === selectedCategory);

  return (
    <div className="space-y-4">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Product Inventory</h2>
        <div className="flex gap-2">
          <select
            className="px-2 py-1 border rounded-md text-gray-900 bg-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Furniture</option>
            <option>Accessories</option>
          </select>
          <Button variant="outline" onClick={() => setShowAddModal(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add New Product
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <div className="border rounded-lg">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Product ID</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Category</TableHeader>
              <TableHeader>Price</TableHeader>
              <TableHeader>Stock</TableHeader>
              <TableHeader>Supplier</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Last Updated</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInventory.map((product: InventoryItem) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>KSH{product.price.toFixed(2)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.supplier}</TableCell>
                <TableCell>
                  <Badge variant={product.status === "In Stock" ? "success" : "destructive"}>
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(product.lastUpdated).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                  <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowEditModal(true);
                        }}
                      >
                  <Edit className="h-4 w-4" />
                </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}>
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>


        {selectedProduct && (
        <EditProductModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          product={selectedProduct}
          onUpdateProduct={handleUpdateProduct}
        />
      )}
      </div>

      {/* Add Product Modal */}
      <AddProductModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} onAddProduct={handleAddProduct} />

    </div>
  );
}
