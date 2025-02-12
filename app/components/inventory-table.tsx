import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { Badge } from "@/app/components/ui/badge"
import { Edit, BarChart2, Trash2 } from "lucide-react"
import { Button } from "@/app/components/ui/button"

const inventory = [
  {
    id: "PRD001",
    name: "Wireless Earbuds",
    category: "Electronics",
    price: 79.99,
    stock: 150,
    supplier: "TechGear Inc.",
    status: "In Stock",
    lastUpdated: "2023-06-15",
  },
  {
    id: "PRD002",
    name: "Smart Watch",
    category: "Electronics",
    price: 199.99,
    stock: 75,
    supplier: "WearableTech Co.",
    status: "Low Stock",
    lastUpdated: "2023-06-10",
  },
  {
    id: "PRD003",
    name: "Ergonomic Office Chair",
    category: "Furniture",
    price: 249.99,
    stock: 30,
    supplier: "ComfortSeating Ltd.",
    status: "In Stock",
    lastUpdated: "2023-06-12",
  },
  {
    id: "PRD004",
    name: "4K Ultra HD TV",
    category: "Electronics",
    price: 799.99,
    stock: 0,
    supplier: "VisualPro Electronics",
    status: "Out of Stock",
    lastUpdated: "2023-06-08",
  },
  {
    id: "PRD005",
    name: "Stainless Steel Water Bottle",
    category: "Accessories",
    price: 24.99,
    stock: 200,
    supplier: "EcoLife Products",
    status: "In Stock",
    lastUpdated: "2023-06-14",
  },
]

export function InventoryTable() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Product Inventory</h2>
        <div className="flex gap-2">
          <select className="px-2 py-1 border rounded-md text-gray-900 bg-white">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Furniture</option>
            <option>Accessories</option>
          </select>
          <Button variant="outline">Add New Product</Button>
        </div>
      </div>
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
            {inventory.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.supplier}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      product.status === "In Stock"
                        ? "success"
                        : product.status === "Low Stock"
                          ? "warning"
                          : "destructive"
                    }
                  >
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell>{product.lastUpdated}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <BarChart2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

