import { cn } from "@/lib/classnames";
import { inputStyles } from "@/lib/theme";

type SearchInputProps = {
  name: string;
  placeholder: string;
  defaultValue?: string;
  className?: string;
};

export function SearchInput({ name, placeholder, defaultValue, className }: SearchInputProps) {
  return (
    <input
      type="search"
      name={name}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className={cn(inputStyles.base, className)}
    />
  );
}
