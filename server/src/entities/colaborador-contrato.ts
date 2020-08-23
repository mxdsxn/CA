type ColaboradorContratoEntity = {
  IdColaboradorContrato: Number;
  IdColaborador: Number;
  MatriculaRM: String;
  MatriculaADP: String;
  IdContratoModalidade: Number;
  CargaHoraria: Number;
  IdContratoPeriodo: Number;
  DataInicioContrato: Date;
  DataFimPrevistoContrato: Date;
  IdContratoDuracao: Number;
  Termino: Date;
  MotivoDesligamento: String;
  DemissaoVoluntaria: Boolean;
  IdEmployer: Number;
}

export default ColaboradorContratoEntity