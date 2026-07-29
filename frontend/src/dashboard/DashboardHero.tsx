import { ChartNoAxesColumnDecreasing, MapPin } from "lucide-react";
import { Dropdown } from "../components/dropdown";

type DashboardHeroProps = {
  indicador: string;
  regiao: string;
  onChange: (campo: "indicador" | "regiao", valor: string) => void;
  disabled?: boolean;
};

export default function DashboardHero({ indicador, regiao, onChange, disabled }: DashboardHeroProps) {
  return (
    <section className="w-full mt-4 mb-3 p-1 sm:px-5">
      <div className="rounded-md border border-slate-200 bg-white p-2 px-4 sm:px-9 shadow-sm">
        <div className="grid gap-4 sm:gap-8 lg:grid-cols-2">
          <Dropdown
            id="indicador"
            label="Indicador"
            value={indicador}
            disabled={disabled}
            icon={<ChartNoAxesColumnDecreasing className="h-4 stroke-5 w-4 text-blue-600 sm:h-5 sm:w-5 lg:h-5 lg:w-5" />}
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
            disabled={disabled}
            icon={<MapPin className="h-4 w-4 text-blue-600 sm:h-5 sm:w-5 lg:h-5 lg:w-5" />}
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
        </div>
      </div>
    </section>
  );
}