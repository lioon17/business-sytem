"use client";

const transactions = [
  { id: 1, product: "Lipstick", amount: "$20", status: "Completed" },
  { id: 2, product: "Foundation", amount: "$30", status: "Pending" },
];

export default function TransactionsPage() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Sales Transactions</h2>
      <table className="w-full border-collapse border border-gray-200 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Product</th>
            <th className="p-3 border">Amount</th>
            <th className="p-3 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="border-b">
              <td className="p-3 border">{tx.product}</td>
              <td className="p-3 border">{tx.amount}</td>
              <td className="p-3 border">{tx.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 