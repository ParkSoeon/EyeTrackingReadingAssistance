// src/components/ui/input.tsx
import React from "react";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
      <input
        className="border px-3 py-2 rounded w-full"
        {...props}
      />
    );
  }