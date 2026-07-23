
import { useState } from 'react';

function DropdownFiltro({ filtro, setFiltro }) {
  return (
    <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
      <option value="populacao">População</option>
      <option value="densidade">Densidade Demográfica</option>
    </select>
  );


export default function Dashboard() {
  const [filtro, setFiltro] = useState('populacao');

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard IBGE</h1>

      <DropdownFiltro filtro={filtro} setFiltro={setFiltro} />

      {/* placeholder da regiao, vai ativar no nivel 3 */}
      <select disabled>
        <option>Regiao (em breve)</option>
      </select>
    </div>
  );
}
}