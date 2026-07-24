// components/filter.tsx
import { useState, useEffect } from "react"
import axios from "axios"
import { Dropdown } from "./dropdown"
import type { Estado } from "../types/state"

type FilterProps = {
  indicador: string
  regiao: string
  onChange: (campo: "indicador" | "regiao", valor: string) => void
}

const indicatorOptions = [
  { value: "populacao", label: "População" },
  { value: "densidade", label: "Densidade demográfica" },
]

export function Filter({ indicador, regiao, onChange }: FilterProps) {
  const [estados, setEstados] = useState<Estado[]>([])

  useEffect(() => {
    async function fetchEstados() {
      try {
        const { data } = await axios.get<Estado[]>(
          `${import.meta.env.VITE_BACKEND_SERVICE_URL}/api/estados`
        )
        setEstados(data)
      } catch (error) {
        console.error("Erro ao buscar estados:", error)
      }
    }

    fetchEstados()
  }, [])

  const regioesUnicas = Array.from(new Set(estados.map((estado) => estado.regiao)))

  const regionOptions = [
    { value: "Brasil", label: "Brasil" },
    ...regioesUnicas.map((sigla) => ({ value: sigla, label: sigla })),
  ]

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
          value={indicador}
          options={indicatorOptions}
          onChange={(valor) => onChange("indicador", valor)}
        />

        <Dropdown
          id="regiao"
          label="Região"
          value={regiao}
          options={regionOptions}
          onChange={(valor) => onChange("regiao", valor)}
        />
      </div>
    </section>
  )
}