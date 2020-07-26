export default interface IAtividade {
  IdAtividade: number;
  IdColaborador: number;
  IdProjeto: number;
  Projeto: String;
  IdProjetoCategoriaAtividade: number;
  CategoriaAtividade: String;
  IdProjetoMetodologiaFase: number;
  FaseProjeto: String;
  DataCadastro: Date;
  DataAtividade: Date;
  Carga: string;
  Descricao: String;
  Tags: String;
  IdCoordenador: number;
}
