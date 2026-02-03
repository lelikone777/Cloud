import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/classnames";
import { buttonStyles } from "@/lib/theme";

type ButtonVariant = "primary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonStyles.base, buttonStyles[variant], className)}
      {...props}
    />
  );
}
