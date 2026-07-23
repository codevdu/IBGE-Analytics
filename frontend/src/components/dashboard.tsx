
import { KpiCard } from "./kpi-card";
import { Filter } from "./filter";

export function Dashboard() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <p className="mb-2 text-sm font-medium uppercase tracking-widest text-blue-400">
                Painel de dados
                </p>

                <h1 className="text-3xl font-bold text-white sm:text-4xl">
                IBGE Analytics
                </h1>

                <p className="mt-2 max-w-2xl text-slate-400">
                Visualize indicadores populacionais das regiões brasileiras de forma
                simples e organizada.
                </p>
            </div>

            <div className="w-fit rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2">
                <span className="text-sm font-medium text-blue-300">
                Dados do IBGE
                </span>
            </div>
        </header>

        <Filter />

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <KpiCard
                title="População total"
                value="203 milhões"
                description="Estimativa nacional"
            />

            <KpiCard
                title="Região selecionada"
                value="Brasil"
                description="Abrangência da consulta"
            />

            <KpiCard
                title="Indicador atual"
                value="População"
                description="Métrica exibida no painel"
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