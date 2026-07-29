import { TrendingUp, TrendingDown, ChartColumn, Users } from "lucide-react";
import type { IKpis } from "../types/dashboard";

type DashboardStatisticsProps = {
  kpis: IKpis;
  indicador: string;
  loading?: boolean;
};

function formatNumber(valor: number, indicador: string) {
  // Densidade tem casas decimais relevantes (hab/km²); população é sempre inteira.
  const casasDecimais = indicador === "densidade" ? 1 : 0;

  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: casasDecimais,
    maximumFractionDigits: casasDecimais,
  });
}

export default function DashboardStatistics({ kpis, indicador, loading }: DashboardStatisticsProps) {
  const statistics = [
    {
      title: "Maior valor",
      value: formatNumber(kpis.maior.valor, indicador),
      description: kpis.maior.nome,
      icon: TrendingUp,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      titleColor: "text-green-600",
      borderColor: "border-l-green-500",
    },
    {
      title: "Menor valor",
      value: formatNumber(kpis.menor.valor, indicador),
      description: kpis.menor.nome,
      icon: TrendingDown,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      titleColor: "text-red-600",
      borderColor: "border-l-red-500",
    },
    {
      title: "Média da região",
      value: formatNumber(kpis.media, indicador),
      description: indicador === "densidade" ? "hab/km²" : "habitantes",
      icon: ChartColumn,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      titleColor: "text-blue-600",
      borderColor: "border-l-blue-500",
    },
    {
      title: "Total de estados",
      value: String(kpis.total),
      description: "estados",
      icon: Users,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500",
      titleColor: "text-orange-500",
      borderColor: "border-l-orange-500",
    },
  ];

  return (
    <section className={`w-full px-1 mt-1 sm:px-5 transition-opacity ${loading ? "opacity-50" : ""}`}>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-9 xl:grid-cols-4">
    {statistics.map((card) => {
      const Icon = card.icon;

      return (
        <article
          key={card.title}
          className={`flex flex-col justify-between min-h-32 gap-3 rounded-md border border-slate-200 border-l-4 ${card.borderColor} bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md sm:min-h-32 lg:px-5`}
        >
          <div className="min-w-0">
            <p className={`truncate text-[10px] font-medium sm:text-xs md:text-sm ${card.titleColor}`}>
              {card.title}
            </p>
            <p className="mt-1 truncate text-sm font-semibold leading-none text-slate-900 sm:text-lg md:text-xl lg:text-2xl">
              {card.value}
            </p>
            <p className="mt-1 truncate text-xs text-slate-500 sm:mt-2 sm:text-sm">
              {card.description}
            </p>
          </div>

          <div
            className={`flex w-fit items-center gap-1.5 rounded-full ${card.iconBg} px-2.5 py-2.5`}
          >
            <Icon className={`${card.iconColor} h-3.5 w-3.5 sm:h-4 sm:w-4`} />
          </div>
        </article>
      );
    })}
  </div>
</section>
  );
}