
import { KpiCard } from "./kpi-card";
import { Filter } from "./filter";

export function Dashboard() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-blue-400">
            Painel de dados
          </p>

          <h1 className="text-3xl font-bold text-white">
            IBGE Analytics
          </h1>

          <p className="mt-2 text-slate-400">
            Visualize indicadores populacionais das regiões brasileiras.
          </p>
        </header>

        <Filter />

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <KpiCard
                title="População total"
                value="203 milhões"
            />

            <KpiCard
                title="Região selecionada"
                value="Brasil"
            />

            <KpiCard
                title="Indicador atual"
                value="População"
            />
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold text-white">
                Visualização dos Dados
            </h2>

            <p className="mt-2 text-sm text-slate-400">
                O gráfico será exibido aqui após a integração com a API do IBGE.
            </p>

            <div className="mt-6 flex h-96 items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-950">
                <span className="text-slate-500">
                Área reservada para o gráfico
                </span>
            </div>
        </section>
      </div>
    </main>
  );
}