import { Globe, Info, ChartColumnIncreasing } from "lucide-react";
import { useState } from "react";
import { Dropdown } from "../components/dropdown";

export default function DashboardHero() {
  const [filters, setFilters] = useState({
    indicador: "populacao",
    regiao: "Brasil",
  });

  function handleChange(campo: "indicador" | "regiao", valor: string) {
    setFilters((prev) => ({ ...prev, [campo]: valor }));
  }

  return (
    <section className="w-full mt-2 mb-2 p-1 sm:px-5">
      <div className="rounded-md border border-slate-200 bg-white p-2 px-4 shadow-sm">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Indicador */}

          <Dropdown
            id="indicador"
            label="Indicador"
            value={filters.indicador}
            icon={
              <ChartColumnIncreasing className="h-4 w-4 text-blue-600 sm:h-5 sm:w-5 lg:h-5 lg:w-5" />
            }
            options={[
              {
                value: "populacao",
                label: "População",
              },
              {
                value: "densidade",
                label: "Densidade demográfica",
              },
            ]}
            onChange={(value) => handleChange("indicador", value)}
          />

          <Dropdown
            id="regiao"
            label="Região"
            value={filters.regiao}
            icon={
              <Globe className="h-4 w-4 text-blue-600 sm:h-5 sm:w-5 lg:h-5 lg:w-5" />
            }
            options={[
              { value: "Brasil", label: "Brasil" },
              { value: "N", label: "Norte" },
              { value: "NE", label: "Nordeste" },
              { value: "SE", label: "Sudeste" },
              { value: "S", label: "Sul" },
              { value: "CO", label: "Centro-Oeste" },
            ]}
            onChange={(value) => handleChange("regiao", value)}
          />

            {/* Está lógica precisa ser alterada de acordo com a região que está sendo exibida
             ou podemos deixar somente um texto generico  */}
          <div className="rounded-xl bg-blue-50 p-2 sm:p-3 lg:p-3">
            <div className="flex items-start gap-2 sm:gap-2">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 sm:h-5 sm:w-5 lg:h-4 lg:w-4" />

              <div>
                <h3 className="font-semibold text-blue-700 text-xs sm:text-sm lg:text-sm">
                  Sobre o recorte
                </h3>

                <p className="text-[10px] leading-4 text-slate-600 sm:text-xs sm:leading-5 lg:text-sm lg:leading-5">
                  Exibindo dados para os estados da região Nordeste (NE) no
                  indicador Densidade demográfica.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
