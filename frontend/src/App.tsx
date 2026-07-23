import { useState, useEffect } from 'react'
import { getDashboard } from './api/index'
import { Dashboard } from './components/dashboard'

function App() {
  const [filters, setFilters] = useState({
    indicator: 'populacao',
    region: 'Brasil'
  })
  
  const [dados, setDados] = useState(null)

  useEffect(() => {
    getDashboard(filters).then(setDados)
  }, [filters])

  return (
    <>
      <h1 className='text-2xl'>IBGE Analytics</h1>
      <Dashboard /> 
    </>
  )
}

export default App;