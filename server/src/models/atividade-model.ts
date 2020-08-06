export default interface IAtividade {
  IdAtividade: number;
  IdColaborador: number;
  IdProjeto: number;
  Projeto: string;
  IdProjetoCategoriaAtividade: number;
  CategoriaAtividade: string;
  IdProjetoMetodologiaFase: number;
  FaseProjeto: string;
  DataCadastro: Date;
  DataAtividade: Date;
  Carga: string;
  Descricao: string;
  Tags: string;
  IdCoordenador: number;
}
