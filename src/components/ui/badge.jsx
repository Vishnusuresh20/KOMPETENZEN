import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-indigo-500 text-white shadow hover:bg-indigo-600",
        secondary:
          "border-transparent bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20",
        destructive:
          "border-transparent bg-rose-500/10 text-rose-400 hover:bg-rose-500/20",
        outline: "text-[rgb(var(--foreground))] border-[rgb(var(--border))]",
        success: "border-transparent bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20",
        warning: "border-transparent bg-amber-500/10 text-amber-400 hover:bg-amber-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
