import { Link } from "react-router";
import {
  ArrowLeft,
  Database,
  RefreshCw,
  ShieldCheck,
  Workflow,
  Server,
  GitBranch,
  type LucideIcon,
} from "lucide-react";

type InfoCard = {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  content: string | string[];
}

const dadosCards: InfoCard[] = [
  {
    icon: Database,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    title: "Fonte oficial",
    content:
      "Todos os dados vêm da API pública de dados abertos do IBGE (servicodados.ibge.gov.br), sem necessidade de chave de acesso ou cadastro. Nenhum valor exibido é inventado ou estimado manualmente.",
  },
  {
    icon: RefreshCw,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    title: "Indicadores disponíveis",
    content: [
      "População: população residente estimada, último período disponível.",
      "Densidade demográfica: habitantes por km², dado do censo 2010.",
    ],
  },
]

const funcionamentoCards: InfoCard[] = [
  {
    icon: Workflow,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    title: "O fluxo, do clique ao gráfico",
    content: [
      "Você seleciona um indicador e uma região nas dropdowns.",
      "O frontend (React) envia essa escolha para o backend.",
      "O backend repassa o pedido para um serviço em Python, que busca o dado bruto do IBGE, limpa valores ausentes ou mal formatados, filtra pela região escolhida e monta o gráfico.",
      "O gráfico já pronto (e os indicadores de maior, menor, média e total) volta para a tela — nada é redesenhado manualmente no navegador.",
    ],
  },
  {
    icon: Server,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    title: "Três serviços, três responsabilidades",
    content: [
      "Frontend: exibe as dropdowns, o gráfico e os indicadores — não processa nem calcula nada, só mostra o que recebe.",
      "Backend: recebe o pedido do frontend e repassa para o serviço de dados, sem guardar ou alterar nenhuma informação no meio do caminho.",
      "Serviço de dados: busca o dado real do IBGE, trata valores ausentes ou mal formatados, calcula os indicadores e monta o gráfico sob demanda, a cada seleção.",
    ],
  },
  {
    icon: ShieldCheck,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    title: "Nada é fixo ou pré-desenhado",
    content:
      "O gráfico e os indicadores são sempre calculados a partir do recorte escolhido. Se a região selecionada tem 9 estados, o gráfico mostra 9 barras; se tem 4, mostra 4. Trocar de indicador muda a escala e a ordem inteira do gráfico, porque os valores por trás são outros.",
  },
  {
    icon: GitBranch,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    title: "Um projeto, dois times",
    content:
      "O IBGE Analytics foi construído por duas equipes trabalhando em paralelo: uma responsável pela interface e pela ponte entre o navegador e os serviços, e outra responsável por buscar, tratar e transformar o dado bruto do IBGE em algo visual. As duas equipes combinam previamente o formato dos dados trocados entre si, o que permite que cada lado evolua sua parte sem depender da outra estar pronta.",
  },
]

const rodape =
  'KPIs (maior, menor, média, total) são calculados sobre os estados do recorte selecionado, não sobre o Brasil inteiro, exceto quando a região "Brasil" está selecionada.'

function CardSection({ cards }: { cards: InfoCard[] }) {
  return (
    <section className="mt-6 space-y-6 first:mt-8">
      {cards.map((card) => {
        const Icon = card.icon

        return (
          <div key={card.title} className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <div className={`rounded-lg ${card.iconBg} p-2`}>
                <Icon className={`h-5 w-5 ${card.iconColor}`} />
              </div>
              <div>
                <h2 className="font-semibold text-slate-800">{card.title}</h2>

                {Array.isArray(card.content) ? (
                  <ul className="mt-1 space-y-1 text-sm text-slate-600">
                    {card.content.map((linha) => (
                      <li key={linha}>{linha}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1 text-sm text-slate-600">{card.content}</p>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default function AboutLink() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-8">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao dashboard
        </Link>

        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Sobre os dados</h1>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          Como o IBGE Analytics coleta, processa e exibe os indicadores públicos do IBGE — e como
          o sistema funciona por trás da tela.
        </p>

        <CardSection cards={dadosCards} />

        <h2 className="mt-12 text-xl font-bold text-slate-900">Como o projeto funciona</h2>
        <p className="mt-2 text-sm text-slate-600">
          O IBGE Analytics é dividido em três partes independentes, que conversam entre si por um
          formato de dado combinado (contrato), não por acesso direto a banco de dados.
        </p>

        <CardSection cards={funcionamentoCards} />

        <p className="mt-8 text-xs text-slate-400">{rodape}</p>
      </div>
    </div>
  )
}