// src/components/ui/avatar.tsx
import React from "react";

export function Avatar({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-full overflow-hidden w-8 h-8 flex items-center justify-center bg-gray-300 ${className ?? ""}`}>
      {children}
    </div>
  );
}