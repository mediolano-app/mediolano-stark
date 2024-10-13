import React from 'react'

type ButtonProps = {
  children: React.ReactNode
  variant?: 'default' | 'outline'
  className?: string
  onClick?: () => void
}

export function Button({ children, variant = 'default', className = '', onClick }: ButtonProps) {
  const baseStyles = 'px-4 py-2 rounded-md font-medium transition-colors duration-200 ease-in-out'
  const variantStyles = {
    default: 'bg-blue-500 text-white hover:bg-blue-600',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}