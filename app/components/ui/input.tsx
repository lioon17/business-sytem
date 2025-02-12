export function Input({ type, placeholder, className }: { type: string; placeholder: string; className?: string }) {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className={`border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      />
    );
  }
  