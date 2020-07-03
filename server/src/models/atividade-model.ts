export default interface IAtividade {
  IdAtividade: Number;
  IdColaborador: Number;
  IdProjeto: Number;
  Projeto: String;
  IdProjetoCategoriaAtividade: Number;
  IdProjetoMetodologiaFase: Number;
  DataCadastro: Date;
  DataAtividade: Date;
  Carga: Date;
  Descricao: String;
  Tags: String;
  IdCoordenador: Number;
}
