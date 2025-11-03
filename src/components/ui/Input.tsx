import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Search, X } from "lucide-react";

const inputVariants = cva(
  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-input focus-visible:border-primary",
        filled: "bg-muted border-transparent focus-visible:bg-background focus-visible:border-primary",
        ghost: "border-transparent bg-transparent focus-visible:border-input focus-visible:bg-background",
        error: "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500",
        success: "border-green-500 focus-visible:border-green-500 focus-visible:ring-green-500"
      },
      inputSize: {
        sm: "h-8 px-2 text-xs",
        default: "h-10 px-3",
        lg: "h-12 px-4 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default"
    }
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clearable?: boolean;
  error?: string;
  helperText?: string;
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    variant, 
    inputSize, 
    type, 
    leftIcon, 
    rightIcon, 
    clearable = false,
    error,
    helperText,
    label,
    value,
    onChange,
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(value || "");
    
    const isPassword = type === "password";
    const actualType = isPassword && showPassword ? "text" : type;
    
    const handleClear = () => {
      setInternalValue("");
      if (onChange) {
        const event = {
          target: { value: "" }
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value);
      if (onChange) {
        onChange(e);
      }
    };

    React.useEffect(() => {
      setInternalValue(value || "");
    }, [value]);

    const inputElement = (
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3 z-10 text-muted-foreground">
            {leftIcon}
          </div>
        )}
        
        <input
          type={actualType}
          className={cn(
            inputVariants({ variant: error ? "error" : variant, inputSize, className }),
            leftIcon && "pl-10",
            (rightIcon || clearable || isPassword) && "pr-10"
          )}
          ref={ref}
          value={internalValue}
          onChange={handleChange}
          {...props}
        />
        
        <div className="absolute right-3 z-10 flex items-center gap-1">
          {clearable && internalValue && (
            <button
              type="button"
              onClick={handleClear}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
          
          {rightIcon && !clearable && !isPassword && rightIcon}
        </div>
      </div>
    );

    if (label || error || helperText) {
      return (
        <div className="space-y-2">
          {label && (
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {label}
            </label>
          )}
          {inputElement}
          {(error || helperText) && (
            <p className={cn(
              "text-xs",
              error ? "text-red-500" : "text-muted-foreground"
            )}>
              {error || helperText}
            </p>
          )}
        </div>
      );
    }

    return inputElement;
  }
);
Input.displayName = "Input";

// Search Input Component
export interface SearchInputProps extends Omit<InputProps, 'leftIcon' | 'type'> {
  onSearch?: (value: string) => void;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onSearch, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(e);
      if (onSearch) onSearch(e.target.value);
    };

    return (
      <Input
        ref={ref}
        type="text"
        leftIcon={<Search className="h-4 w-4" />}
        placeholder="Search..."
        clearable
        onChange={handleChange}
        {...props}
      />
    );
  }
);
SearchInput.displayName = "SearchInput";

export { Input, SearchInput, inputVariants };