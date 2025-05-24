// // src/components/ui/button.tsx

import React from "react"
import { cn } from "@/lib/utils"


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "ghost" | "default"
}

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  const variantClass = variant === "ghost" ? "bg-transparent hover:bg-gray-100" : "bg-blue-500 text-white"
  return <button className={cn(variantClass, className)} {...props} />
}
