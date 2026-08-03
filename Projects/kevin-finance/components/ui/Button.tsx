import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "success" | "danger";
}   

export default function Button({ 
    variant = "primary", className = "", children, ...props }: ButtonProps) {
    const base = "px-4 py-2 rounded font-meduim text-while transition";

    const variants = {
        primary: "bg-blue-600 hover:bg-blue-700",
        success: "bg-green-600 hover:bg-green-700 ",
        danger: "bg-red-600 hover:bg-red-700 ",
    };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}   