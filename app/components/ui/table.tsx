export function Table({ children }: { children: React.ReactNode }) {
    return (
      <table className="w-full border-collapse border border-gray-300 text-gray-900 bg-white">
        {children}
      </table>
    );
  }
  
  export function TableHead({ children }: { children: React.ReactNode }) {
    return <thead className="bg-gray-100 text-gray-700 font-semibold">{children}</thead>;
  }
  
  export function TableBody({ children }: { children: React.ReactNode }) {
    return <tbody className="divide-y divide-gray-200">{children}</tbody>;
  }
  
  export function TableRow({ children }: { children: React.ReactNode }) {
    return <tr className="hover:bg-gray-50">{children}</tr>;
  }
  
  export function TableCell({ children }: { children: React.ReactNode }) {
    return <td className="px-4 py-2 border border-gray-300 text-gray-900">{children}</td>;
  }
  
  export function TableHeader({ children }: { children: React.ReactNode }) {
    return <th className="px-4 py-2 border border-gray-300 text-left text-gray-700">{children}</th>;
  }
  
