// components/dropdown.tsx
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  id: string;
  label: string;
  value: string;
  options: DropdownOption[];
  onChange: (newValue: string) => void;
  icon?: ReactNode;
}

export function Dropdown({
  id,
  label,
  value,
  options,
  onChange,
  icon,
}: DropdownProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="sm:mb-2 mb-1 block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 rounded-lg bg-blue-100 p-1 sm:1.5">
            {icon}
          </div>
        )}

        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="sm:h-10 h-10 text-sm w-full appearance-none rounded-md border border-slate-300 bg-white pl-16 pr-12 text-slate-700 outline-none transition hover:border-blue-500 focus:border-blue-500"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={20}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
        />
      </div>
    </div>
  );
}