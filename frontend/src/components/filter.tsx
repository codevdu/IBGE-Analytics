export function Filter() {
  return (
    <section className="w-full rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Filtros</h2>

        <p className="mt-1 text-sm text-slate-300">
          Selecione um indicador e uma região para visualizar os dados.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label
            htmlFor="indicador"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Indicador
          </label>

          <select
            id="indicador"
            name="indicador"
            defaultValue="populacao"
            className="h-12 w-full cursor-pointer rounded-xl border border-white/10 bg-slate-800 px-4 text-sm text-white outline-none transition hover:border-blue-400/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
          >
            <option value="populacao">População</option>

            <option value="densidade">
              Densidade demográfica
            </option>
          </select>
        </div>

        <div>
          <label
            htmlFor="regiao"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Região
          </label>

          <select
            id="regiao"
            name="regiao"
            defaultValue="brasil"
            className="h-12 w-full cursor-pointer rounded-xl border border-white/10 bg-slate-800 px-4 text-sm text-white outline-none transition hover:border-blue-400/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
          >
            <option value="brasil">Brasil</option>
            <option value="norte">Norte</option>
            <option value="nordeste">Nordeste</option>
            <option value="centro-oeste">Centro-Oeste</option>
            <option value="sudeste">Sudeste</option>
            <option value="sul">Sul</option>
          </select>
        </div>
      </div>
    </section>
  );
}