import * as React from "react"
import { cn } from "~~/lib/utils"

export interface RadioGroupProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {}

const RadioGroup = React.forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <fieldset
        ref={ref}
        className={cn("grid gap-2", className)}
        {...props}
      />
    )
  }
)
RadioGroup.displayName = "RadioGroup"

export interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <label className={cn("flex items-center space-x-2", className)}>
        <input
          type="radio"
          className="form-radio h-4 w-4 text-primary border-gray-300 focus:ring-2 focus:ring-primary"
          ref={ref}
          {...props}
        />
        <span>{children}</span>
      </label>
    )
  }
)
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }