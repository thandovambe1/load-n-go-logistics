import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Badge variants using CVA
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus-none focus-2 focus-ring focus-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// Converted function without TypeScript types
function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
