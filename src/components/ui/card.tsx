import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-white shadow rounded-xl p-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}

export function CardContent({ children }: { children: ReactNode }) {
  return <div className="mt-2 text-gray-600">{children}</div>;
}