import { Dropdown } from "./dropdown";

export function Filter() {
  
  const indicatorOptions = [
  { value: "populacao", label: "População" },
  { value: "densidade", label: "Densidade demográfica" },
];

const regionOptions = [
  { value: "brasil", label: "Brasil" },
  { value: "norte", label: "Norte" },
  { value: "nordeste", label: "Nordeste" },
  { value: "centro-oeste", label: "Centro-Oeste" },
  { value: "sudeste", label: "Sudeste" },
  { value: "sul", label: "Sul" },
];
  
return (
    <section className="w-full rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Filtros</h2>

        <p className="mt-1 text-sm text-slate-300">
          Selecione um indicador e uma região para visualizar os dados.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Dropdown
            id="indicador"
            label="Indicador"
            value="populacao"
            options={indicatorOptions}
            onChange={() => {}}
        />

        <Dropdown
            id="regiao"
            label="Região"
            value="brasil"
            options={regionOptions}
            onChange={() => {}}
        />
                
      </div>
    </section>
  );
}