import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

// Base surface used across sections: rounded, soft border, light shadow.
export default function Card({ children, className = "" }: Props) {
  return (
    <div
      className={`rounded-2xl border border-line bg-card shadow-soft ${className}`}
    >
      {children}
    </div>
  );
}
