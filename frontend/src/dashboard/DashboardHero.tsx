// dashboard/DashboardHero.tsx
import { Globe, Info, ChartColumnIncreasing } from "lucide-react";
import { Dropdown } from "../components/dropdown";

type DashboardHeroProps = {
  indicador: string;
  regiao: string;
  onChange: (campo: "indicador" | "regiao", valor: string) => void;
};

const INDICADOR_LABELS: Record<string, string> = {
  populacao: "População",
  densidade: "Densidade demográfica",
};

const REGIAO_LABELS: Record<string, string> = {
  Brasil: "Brasil",
  N: "Norte",
  NE: "Nordeste",
  SE: "Sudeste",
  S: "Sul",
  CO: "Centro-Oeste",
};

export default function DashboardHero({ indicador, regiao, onChange }: DashboardHeroProps) {
  return (
    <section className="w-full mt-2 mb-3 p-1 sm:px-5">
      <div className="rounded-md border border-slate-200 bg-white p-2 px-4 sm:px-9 shadow-sm">
        <div className="grid gap-4 sm:gap-8 lg:grid-cols-3">
          <Dropdown
            id="indicador"
            label="Indicador"
            value={indicador}
            icon={<ChartColumnIncreasing className="h-4 w-4 text-blue-600 sm:h-5 sm:w-5 lg:h-5 lg:w-5" />}
            options={[
              { value: "populacao", label: "População" },
              { value: "densidade", label: "Densidade demográfica" },
            ]}
            onChange={(value) => onChange("indicador", value)}
          />

          <Dropdown
            id="regiao"
            label="Região"
            value={regiao}
            icon={<Globe className="h-4 w-4 text-blue-600 sm:h-5 sm:w-5 lg:h-5 lg:w-5" />}
            options={[
              { value: "Brasil", label: "Brasil" },
              { value: "N", label: "Norte" },
              { value: "NE", label: "Nordeste" },
              { value: "SE", label: "Sudeste" },
              { value: "S", label: "Sul" },
              { value: "CO", label: "Centro-Oeste" },
            ]}
            onChange={(value) => onChange("regiao", value)}
          />

          <div className="rounded bg-blue-50 p-2 sm:p-3 lg:p-3">
            <div className="flex items-start gap-2 sm:gap-2">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 sm:h-5 sm:w-5 lg:h-4 lg:w-4" />
              <div>
                <h3 className="font-semibold text-blue-700 text-xs sm:text-sm lg:text-sm">
                  Sobre o recorte
                </h3>
                <p className="text-[10px] leading-4 text-slate-800 sm:text-xs sm:leading-5 lg:text-xs lg:leading-5">
                  <i>
                    Exibindo dados para os estados da região {REGIAO_LABELS[regiao] ?? regiao} no
                    indicador {INDICADOR_LABELS[indicador] ?? indicador}.
                  </i>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}