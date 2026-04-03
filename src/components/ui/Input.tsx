import React, { forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';   // ← Yeh line add karein

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  leftIcon?: LucideIcon;        // ← Nayi line add ki
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  startAdornment,
  endAdornment,
  leftIcon: LeftIcon,     // ← Yeh rename kiya (best practice)
  fullWidth = false,
  className = '',
  ...props
}, ref) => {
  
  const widthClass = fullWidth ? 'w-full' : '';
  const errorClass = error 
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
    : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500';
  
  const inputBaseClass = `block w-full rounded-md shadow-sm focus:ring-2 focus:ring-opacity-50 sm:text-sm ${errorClass}`;
  
  return (
    <div className={`${widthClass} ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        {LeftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <LeftIcon size={20} />
          </div>
        )}

        {startAdornment && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            {startAdornment}
          </div>
        )}
        
        <input
          ref={ref}
          className={`${inputBaseClass} ${LeftIcon || startAdornment ? 'pl-10' : ''}`}
          {...props}
        />
        
        {endAdornment && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
            {endAdornment}
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <p className={`mt-1 text-sm ${error ? 'text-red-500' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';