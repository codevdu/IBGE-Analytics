import { Router, Request, Response } from "express"
import axios from "axios"

const dashboardRoutes = Router()

dashboardRoutes.get("/", async (req: Request, res: Response) => {
  const { indicator, region } = req.query

  if (!indicator || !region) {
    return res.status(400).json({
      message: "Os parâmetros 'indicador' e 'região' são obrigatórios na busca."
    })
  }

  try {
    const pyServiceUrl = process.env.PY_SERVICE_URL || "http://localhost:8000"

    const { data } = await axios.get(`${pyServiceUrl}/chart`, {
      params: {
        indicator: String(indicator),
        region: String(region)
      }
    })

    if (!data || Object.keys(data).length === 0) {
      return res.status(404).json({
        message: "Nenhum dado encontrado para a combinação selecionada.",
        emptyData: true
      })
    }

    return res.json(data)
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({
        message: "Não foram encontrados dados para essa região/indicador.",
        emptyData: true
      })
    }

    throw new Error(`Erro ao conectar com o serviço Python: ${error.message}`)
  }
})

export { dashboardRoutes }