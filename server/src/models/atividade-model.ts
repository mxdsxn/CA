export default interface IAtividade {
  IdAtividade: number;
  IdColaborador: number;
  IdProjeto: number;
  Projeto: String;
  IdProjetoCategoriaAtividade: number;
  IdProjetoMetodologiaFase: number;
  DataCadastro: Date;
  DataAtividade: Date;
  Carga: string;
  Descricao: String;
  Tags: String;
  IdCoordenador: number;
}
