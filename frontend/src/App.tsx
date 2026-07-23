import { useState } from 'react'
import { Dashboard } from './components/dashboard'
import { Dropdown } from './components/dropdown'

function App() {
  const [filters, setFilters] = useState({
    indicador: 'populacao',
    regiao: 'Brasil'
  })

  function handleChange(campo: 'indicador' | 'regiao', valor: string) {
    setFilters((prev) => ({ ...prev, [campo]: valor }))
  }

  return (
    <>
      <h1 className='text-2xl'>IBGE Analytics</h1>

      <Dropdown
        id="indicador"
        label="Indicador"
        value={filters.indicador}
        options={[{
          value: 'populacao',
          label: 'População'
        }, {
          value: 'densidade',
          label: 'Densidade demográfica'
        }]}
        onChange={(value) => handleChange('indicador', value)}
      />

      <Dropdown
        id="regiao"
        label="Região"
        value={filters.regiao}
        options={[
          { value: 'Brasil', label: 'Brasil' },
          { value: 'N', label: 'Norte' },
          { value: 'NE', label: 'Nordeste' },
          { value: 'SE', label: 'Sudeste' },
          { value: 'S', label: 'Sul' },
          { value: 'CO', label: 'Centro-Oeste' }
        ]}
        onChange={(valor) => handleChange('regiao', valor)}
      />

      <Dashboard
        indicador={filters.indicador}
        regiao={filters.regiao}
      />
    </>
  )
}

export default App