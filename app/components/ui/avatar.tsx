export function Avatar({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`rounded-full bg-gray-200 p-2 ${className}`}>{children}</div>;
  }
  
  export function AvatarFallback({ children }: { children: React.ReactNode }) {
    return <div className="text-center">{children}</div>;
  }
  