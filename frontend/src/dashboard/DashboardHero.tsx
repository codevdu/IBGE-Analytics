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
    <section className="w-full p-1 sm:p-5">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Indicador */}

          <Dropdown
            id="indicador"
            label="Indicador"
            value={filters.indicador}
            icon={<ChartColumnIncreasing size={20} className="text-blue-600" />}
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
            icon={<Globe size={20} className="text-blue-600" />}
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

          {/* Sobre o recorte */}

          <div className="rounded-xl bg-blue-50 p-3">
            <div className="flex gap-3">
              <Info size={25} className="mt-1 text-blue-600" />

              <div>
                <h3 className="mt-1 font-semibold text-blue-700">
                  Sobre o recorte
                </h3>

                <p className="text-sm leading-5 text-slate-600">
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
