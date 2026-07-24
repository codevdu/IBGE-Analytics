import {
  TrendingUp,
  TrendingDown,
  ChartColumn,
  Users,
} from "lucide-react";

const statistics = [
  {
    title: "Maior valor",
    value: "1.038,15",
    description: "Pernambuco (PE)",
    icon: TrendingUp,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    titleColor: "text-slate-800",
  },
  {
    title: "Menor valor",
    value: "11,33",
    description: "Piauí (PI)",
    icon: TrendingDown,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    titleColor: "text-blue-600",
  },
  {
    title: "Média da região",
    value: "72,88",
    description: "hab/km²",
    icon: ChartColumn,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    titleColor: "text-purple-600",
  },
  {
    title: "Total de estados",
    value: "9",
    description: "estados",
    icon: Users,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    titleColor: "text-orange-500",
  },
];

export default function DashboardStatistics() {
  return (
    <section className="w-full px-5 pb-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.title}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              {/* Ícone */}
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.iconBg}`}
              >
                <Icon className={card.iconColor} size={24} />
              </div>

              {/* Conteúdo */}
              <div className="flex flex-col">
                <span
                  className={`text-sm font-semibold ${card.titleColor}`}
                >
                  {card.title}
                </span>

                <span className="mt-1 text-base font-bold leading-none text-slate-900 md:text-2xl">
                  {card.value}
                </span>

                <span className="mt-2 text-sm text-slate-500">
                  {card.description}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}