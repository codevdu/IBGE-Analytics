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
}

export function Dropdown({
  id,
  label,
  value,
  options,
  onChange,
}: DropdownProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-slate-200"
      >
        {label}
      </label>

      <select
        id={id}
        name={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full cursor-pointer rounded-xl border border-white/10 bg-slate-800 px-4 text-sm text-white outline-none transition hover:border-blue-400/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}