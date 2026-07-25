import { Router, Request, Response } from "express"
import axios from "axios"
import mockDensidade from "../../../dados/amostra_densidade.json"
import mockPopulacao from "../../../dados/amostra_populacao.json"

const dashboardRoutes = Router()

const MOCKS: Record<string, unknown> = {
  populacao: mockPopulacao,
  densidade: mockDensidade,
}

dashboardRoutes.get("/", async (req: Request, res: Response) => {
  const USE_MOCK = process.env.USE_MOCK === "true"

  const { indicador, regiao } = req.query

  if (!indicador || !regiao) {
    return res.status(400).json({
      message: "Os parâmetros 'indicador' e 'regiao' são obrigatórios na busca."
    })
  }

  // Nível 1: responde com a amostra de fig.to_json() entregue pela equipe de Dados,
  // escolhendo o mock certo pelo 'indicador'. Ativa com USE_MOCK=true no .env.
  if (USE_MOCK) {
    const mock = MOCKS[String(indicador)]

    if (!mock) {
      return res.status(404).json({
        message: `Nenhum mock encontrado para o indicador '${indicador}'.`,
        emptyData: true
      })
    }

    return res.json(mock)
  }

  try {
    const pyServiceUrl = process.env.PY_SERVICE_URL || "http://localhost:8000"

    const { data } = await axios.get(`${pyServiceUrl}/grafico`, {
      params: {
        indicador: String(indicador),
        regiao: String(regiao)
      }
    })

    if (!data || Object.keys(data).length === 0) {
      return res.status(404).json({
        message: "Nenhum dado encontrado para a combinação selecionada.",
        emptyData: true
      })
    }

    return res.status(200).json(data)
  } catch (error: any) {
    if (error.response?.status === 404) {
      return res.status(404).json({
        message: "Não foram encontrados dados para essa região/indicador.",
        emptyData: true
      })
    }

    return res.status(500).json({
      message: "Erro ao conectar com o serviço Python.",
      detail: error.message
    })
  }
})

export { dashboardRoutes }