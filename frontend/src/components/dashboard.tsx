// components/dashboard.tsx
import { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import axios from "axios";
import type { DashboardResponse } from "../types/dashboard";
import DashboardHeader from "../dashboard/DashboardHeader";
import DashboardHero from "../dashboard/DashboardHero";
import DashboardStatistics from "../dashboard/DashboardStatistics";

type DashboardProps = {
  indicador: string;
  regiao: string;
  onChange: (campo: "indicador" | "regiao", valor: string) => void;
};

export function Dashboard({ indicador, regiao, onChange }: DashboardProps) {
  const [data, setData] = useState<DashboardResponse | null>(null);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const { data } = await axios.get<DashboardResponse>(
          `${import.meta.env.VITE_BACKEND_SERVICE_URL}/api/dashboard`,
          {
            params: {
              indicador,
              regiao
            }
          }
        )
        console.log("Novo fetch:", indicador, regiao)
        setData(data)
        console.log("Dados recebidos:", data)
      } catch (error) {
        console.error("Erro ao buscar dashboard:", error);
      }
    }

    fetchDashboard();
  }, [indicador, regiao]);

  if (!data) {
    return <p>Selecione um recorte…</p>;
  }

  return (
    <div className="bg-slate-50 w-full text-slate-900 overflow-hidden">
      <DashboardHeader />
      <DashboardHero indicador = { indicador } regiao={regiao} onChange={onChange} />
      <DashboardStatistics />

      <div className="w-full h-87.5 sm:h-112.5 md:h-112.5 lg:h-100 mt-5 sm:mt-6">
        <Plot
          key={`${indicador}-${regiao}`}
          data={data.figura.data}
          layout={{
            ...data.figura.layout,
            autosize: true,
            width: undefined,
            height: undefined,
            margin: {
              l: 40,
              r: 20,
              t: 40,
              b: 40,
            },
          }}
          useResizeHandler
          style={{
            width: "100%",
            height: "100%",
          }}
          config={{
            responsive: true,
            displayModeBar: false,
          }}
        />
      </div>
    </div>
  );
}
