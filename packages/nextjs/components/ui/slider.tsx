import * as React from "react"
import { cn } from "~~/lib/utils"

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, ...props }, ref) => (
    <input
      type="range"
      className={cn(
        "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer",
        className
      )}
      ref={ref}
      {...props}
    />
  )
)
Slider.displayName = "Slider"

export { Slider }