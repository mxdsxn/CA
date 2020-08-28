export default interface ColaboradorContratoEntity {
  IdColaboradorContrato: number
  IdColaborador: number
  MatriculaRM: string
  MatriculaADP: string
  IdContratoModalidade: number
  CargaHoraria: number
  IdContratoPeriodo: number
  DataInicioContrato: Date
  DataFimPrevistoContrato: Date
  IdContratoDuracao: number
  Termino: Date
  MotivoDesligamento: string
  DemissaoVoluntaria: boolean
  IdEmployer: number
}
