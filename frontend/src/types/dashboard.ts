import type { Data, Layout } from "plotly.js"

export interface IFigura {
  data: Data[]
  layout: Partial<Layout>
}

export interface IKpi {
  nome: string
  valor: number
}

export interface IKpis {
  total: number
  maior: IKpi
  menor: IKpi
  media: number
}

export interface DashboardResponse {
  figura: IFigura
  kpis: IKpis
}