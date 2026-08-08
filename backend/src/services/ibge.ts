import axios from 'axios'
import { IBGEStateResponse, StateDto } from '../interfaces/ibgeStade.dto'

const BASE = process.env.IBGE_SERVICE_URL || 'https://servicodados.ibge.gov.br/api/v1/localidades'


export async function fetchStates(): Promise<StateDto[]> {
    const { data } = await axios.get<IBGEStateResponse[]>(`${BASE}/estados?orderBy=nome`)

    return data.map((uf) => ({
        id: uf.id,
        initials: uf.sigla,
        name: uf.nome,
        region: uf.regiao.sigla,
    }))
}