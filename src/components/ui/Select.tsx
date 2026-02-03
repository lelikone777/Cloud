import { cn } from "@/lib/classnames";
import { inputStyles } from "@/lib/theme";

type Option = { value: string; label: string };

type SelectProps = {
  name: string;
  options: Option[];
  defaultValue?: string;
  className?: string;
};

export function Select({ name, options, defaultValue, className }: SelectProps) {
  return (
    <select name={name} defaultValue={defaultValue ?? ""} className={cn(inputStyles.select, className)}>
      <option value="">All</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
