import {
  TrendingUp,
  TrendingDown,
  ChartColumn,
  Users,
} from "lucide-react";

/*
  Array de cards mockados só de exemplo antes dos reais,
  vão precisar ser alterados com a lógica real.
*/
const statistics = [
  {
    title: "Maior valor",
    value: "1.038,15",
    description: "Pernambuco (PE)",
    icon: TrendingUp,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    titleColor: "text-slate-800",
  },
  {
    title: "Menor valor",
    value: "11,33",
    description: "Piauí (PI)",
    icon: TrendingDown,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    titleColor: "text-blue-600",
  },
  {
    title: "Média da região",
    value: "72,88",
    description: "hab/km²",
    icon: ChartColumn,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    titleColor: "text-purple-600",
  },
  {
    title: "Total de estados",
    value: "9",
    description: "estados",
    icon: Users,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
    titleColor: "text-orange-500",
  },
];

export default function DashboardStatistics() {
  return (
    <section className="w-full px-1 mt-1 sm:px-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
        {statistics.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.title}
              className="flex min-h-[90px] lg:px-7 items-center gap-2 rounded-md border border-slate-200 bg-white p-1 shadow-sm transition-all duration-300 hover:shadow-md sm:min-h-[90px] sm:gap-4 sm:p-2"
            >
              {/* Ícone */}
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-xl sm:h-12 sm:w-12 sm:rounded-xl ${card.iconBg}`}
              >
                <Icon
                  className={`${card.iconColor} h-5 w-5 sm:h-5 sm:w-5 sm:mt-1 lg:h-6 lg:w-6 `}
                />
              </div>
 
              {/* Conteúdo */}
              <div className="min-w-0 pl-1 flex-1">
                <p
                  className={`truncate text-[10px] font-semibold sm:text-xs md:text-sm ${card.titleColor}`}
                >
                  {card.title}
                </p>

                <p className="mt-1 truncate text-sm font-bold leading-none text-slate-900 sm:text-lg md:text-xl lg:text-2xl">
                  {card.value}
                </p>

                <p className="mt-1 truncate text-xs text-slate-500 sm:mt-2 sm:text-sm">
                  {card.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}