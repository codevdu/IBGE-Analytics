// App.tsx
import { useState } from 'react'
import { Dashboard } from './components/dashboard'
import { Route, Routes } from 'react-router'
import AboutLink from './pages/about-data'

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
      <Routes>
        <Route
          path="/"
          element={<Dashboard indicador={filters.indicador} regiao={filters.regiao} onChange={handleChange} />}
        />
        <Route path="/about" element={<AboutLink />} />
      </Routes>
    </div>
  )
}

export default App