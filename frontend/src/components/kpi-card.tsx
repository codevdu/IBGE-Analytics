interface KpiCardProps {
  title: string;
  value: string;
  description: string;
}

export function KpiCard({
  title,
  value,
  description,
}: KpiCardProps) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 p-6">
      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl" />

      <div className="relative">
        <p className="text-sm font-medium text-slate-400">
          {title}
        </p>

        <p className="mt-3 text-3xl font-bold text-white">
          {value}
        </p>

        <p className="mt-2 text-sm text-slate-500">
          {description}
        </p>
      </div>
    </article>
  );
}