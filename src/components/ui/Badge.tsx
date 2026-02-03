import { cn } from "@/lib/classnames";
import { badgeStyles } from "@/lib/theme";

export function StatusBadge({
  label,
  colorClass,
  className,
}: {
  label: string;
  colorClass: string;
  className?: string;
}) {
  return (
    <span className={cn(badgeStyles.base, className)}>
      <span className={cn(badgeStyles.dot, colorClass)} aria-hidden />
      {label}
    </span>
  );
}
