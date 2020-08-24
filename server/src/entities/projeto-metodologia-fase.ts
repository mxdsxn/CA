export default interface ProjetoMetodologiaFaseEntity {
  IdProjetoMetodologiaFase: number
  IdProjetoMetodologia: number
  Fase: string
  Padrao: boolean
  Ativa: boolean
  JustificativaAdaptacao: string
  Adaptado: boolean
  Ordem: number
  HorasPrevistas: number
}
