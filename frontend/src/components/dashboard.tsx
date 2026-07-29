import { useState, useEffect, useRef, lazy, Suspense } from "react";
import axios from "axios";
import type { DashboardResponse } from "../types/dashboard";
import DashboardHeader from "../dashboard/DashboardHeader";
import DashboardHero from "../dashboard/DashboardHero";
import DashboardStatistics from "../dashboard/DashboardStatistics";
import { Loader } from "lucide-react";

const Plot = lazy(async () => {
  const Plotly = (await import("plotly.js-basic-dist-min")).default;
  const factory = (await import("react-plotly.js/factory")).default;
  return { default: factory(Plotly) };
});

type DashboardProps = {
  indicador: string;
  regiao: string;
  onChange: (campo: "indicador" | "regiao", valor: string) => void;
}

export function Dashboard({ indicador, regiao, onChange }: DashboardProps) {
  const [data, setData] = useState<DashboardResponse | null>(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null)

  const requestId = useRef(0)

  useEffect(() => {
    const currentRequestId = ++requestId.current

    async function fetchDashboard() {
      setLoading(true);
      setError(null);

      try {
        const { data } = await axios.get<DashboardResponse>(
          `${import.meta.env.VITE_BACKEND_SERVICE_URL}/api/dashboard`,
          { params: { indicador, regiao } }
        );

        if (currentRequestId !== requestId.current) return

        setData(data);
      } catch (err) {
        if (currentRequestId !== requestId.current) return

        if (axios.isAxiosError(err)) {
          if (err.response?.status === 404) {
            setError("Não há dados disponíveis para essa combinação de indicador e região.")
          } else if (!err.response) {
            setError("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.")
          } else {
            setError("Ocorreu um erro ao carregar os dados. Tente novamente em instantes.")
          }
        } else {
          setError("Ocorreu um erro inesperado. Tente novamente.")
        }

        console.error("Erro ao buscar dashboard:", err)
      } finally {
        if (currentRequestId === requestId.current) {
          setLoading(false);
        }
      }
    }

    fetchDashboard();
  }, [indicador, regiao]);

  return (
    <div className="bg-slate-50 h-screen w-full text-slate-900 overflow-hidden">
      <DashboardHeader />
      <DashboardHero indicador={indicador} regiao={regiao} onChange={onChange} disabled={loading} />

      {error && (
        <div className="mx-1 sm:mx-5 mt-3 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {!error && loading && !data && (
        <div className="flex justify-center animate-spin mx-1 sm:mx-5 mt-3 p-4 text-sm text-slate-500">
          <Loader className="top-56"/>
        </div>
      )}

      {!error && !data && !loading && <p>Selecione um recorte…</p>}

      {data && (
        <>
          <DashboardStatistics kpis={data.kpis} indicador={indicador} loading={loading} />

          <div className="w-full h-87.5 sm:h-112.5 md:h-112.5 lg:h-100 mt-5 sm:mt-6 relative">
            {loading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60">
                <span className="text-sm text-slate-500">Atualizando…</span>
              </div>
            )}

            <Suspense fallback={<div className="text-sm text-slate-500 p-4">Carregando gráfico…</div>}>
              <Plot
                key={`${indicador}-${regiao}`}
                data={data.figura.data}
                layout={{
                  ...data.figura.layout,
                  autosize: true,
                  width: undefined,
                  height: undefined,
                  margin: { l: 40, r: 20, t: 40, b: 40 },
                }}
                useResizeHandler
                style={{ width: "100%", height: "100%" }}
                config={{ responsive: true, displayModeBar: false }}
              />
            </Suspense>
          </div>
        </>
      )}
    </div>
  )
}