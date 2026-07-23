
export interface IBGEStateResponse {
  id: number
  sigla: string
  nome: string
  regiao: {
    id: number
    sigla: string
    nome: string
  }
}

export interface StateDto {
  id: number
  initials: string
  name: string
  region: string
}