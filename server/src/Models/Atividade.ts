export default interface Atividade {
  IdAtividade: Number;
  IdColaborador: Number;
  IdProjeto: Number;
  Nome: String;
  IdProjetoCategoriaAtividade: Number;
  IdProjetoMetodologiaFase: Number;
  DataCadastro: Date;
  DataAtividade: Date;
  Carga: Date;
  Descricao: String;
  Tags: String;
  IdCoordenador: Number;
}
