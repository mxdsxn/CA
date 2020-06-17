export default interface Atividade {
  IdAtividade: Number;
  IdColaborador: Number;
  IdProjeto: Number;
  IdProjetoCategoriaAtividade: Number;
  IdProjetoMetodologiaFase: Number;
  DataCadastro: Date;
  DataAtividade: Date;
  Carga: TimeRanges;
  Descricao: String;
  Tags: String;
  IdCoordenador: Number;
}
