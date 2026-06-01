'use client'

import { cn } from '@/lib/utils'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'

    const variantStyles = {
      primary: 'text-[#0A1628] focus-visible:ring-[#C9A84C] shadow-sm hover:shadow-md active:scale-[0.98]',
      secondary:
        'bg-[#0A1628] text-white hover:bg-[#0A1628]/90 focus-visible:ring-[#0A1628] shadow-sm hover:shadow-md active:scale-[0.98]',
      ghost:
        'bg-transparent text-[#0A1628] hover:bg-[#0A1628]/5 focus-visible:ring-[#0A1628]',
      outline:
        'bg-transparent border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C]/10 focus-visible:ring-[#C9A84C]',
    }

    const sizeStyles = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          variant === 'primary' && 'bg-[#C9A84C] hover:bg-[#B8973B]',
          className
        )}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
