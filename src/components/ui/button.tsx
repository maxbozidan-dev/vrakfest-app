import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold uppercase tracking-wider ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-racing-yellow focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-tech",
  {
    variants: {
      variant: {
        default:
          "bg-racing-yellow text-black border border-transparent hover:bg-white hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "bg-transparent border border-racing-yellow text-racing-yellow hover:bg-racing-yellow/10 hover:shadow-[0_0_10px_rgba(244,206,20,0.35)]",
        secondary:
          "bg-white/10 text-white border border-white/20 hover:bg-white/20",
        ghost: "hover:bg-white/10 hover:text-white",
        link: "text-racing-yellow underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2 rounded-none",
        sm: "h-9 px-4 rounded-none",
        lg: "h-11 px-8 rounded-none",
        icon: "h-10 w-10 rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const isIcon = size === "icon"

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          !isIcon && "-skew-x-[15deg]"
        )}
        ref={ref}
        {...props}
      >
        {isIcon ? children : <span className="inline-flex items-center gap-2 skew-x-[15deg]">{children}</span>}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
