// components/dashboard.tsx
import { useState, useEffect } from "react"
import Plot from "react-plotly.js"
import axios from "axios"
import type { DashboardResponse } from "../types/dashboard"

type DashboardProps = {
  indicador: string
  regiao: string
}

export function Dashboard({ 
  indicador, 
  regiao 
}: DashboardProps) {
  const [data, setData] = useState<DashboardResponse | null>(null)

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const { data } = await axios.get<DashboardResponse>(
          `http://localhost:3333/api/dashboard`,
          { params: { 
            indicador, 
            regiao 
          } 
        }
        )
        setData(data)
      } catch (error) {
        console.error("Erro ao buscar dashboard:", error)
      }
    }

    fetchDashboard()
  }, [indicador, regiao])

  if (!data) {
    return <p>Selecione um recorte…</p>
  }

  return <Plot data={data.figura.data} layout={data.figura.layout} />
}