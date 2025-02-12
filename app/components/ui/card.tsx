export function Card({
    children,
    className = "",
  }: {
    children: React.ReactNode;
    className?: string;
  }) {
    return (
      <div className={`border rounded-lg p-4 shadow-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white ${className}`}>
        {children}
      </div>
    );
  }
  
  export function CardHeader({
    children,
    className = "",
  }: {
    children: React.ReactNode;
    className?: string;
  }) {
    return (
      <div className={`mb-4 ${className}`}>
        {children}
      </div>
    );
  }
  
  export function CardContent({
    children,
    className = "",
  }: {
    children: React.ReactNode;
    className?: string;
  }) {
    return <div className={className}>{children}</div>;
  }
  
  export function CardTitle({
    children,
    className = "",
  }: {
    children: React.ReactNode;
    className?: string;
  }) {
    return <h2 className={`text-lg font-bold text-gray-900 dark:text-white ${className}`}>
      {children}
    </h2>;
  }
  