// App.tsx
import { useState } from 'react'
import { Dashboard } from './components/dashboard'

function App() {
  const [filters, setFilters] = useState({
    indicador: 'populacao',
    regiao: 'Brasil'
  })

  function handleChange(campo: 'indicador' | 'regiao', valor: string) {
    setFilters((prev) => ({ ...prev, [campo]: valor }))
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <Dashboard
        indicador={filters.indicador}
        regiao={filters.regiao}
        onChange={handleChange}
      />
    </div>
  )
}

export default App