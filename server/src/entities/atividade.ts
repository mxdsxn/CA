export default interface AtividadeEntity {
  IdAtividade: number
  IdColaborador: number
  IdProjeto: number
  IdProjetoCategoriaAtividade: number
  IdProjetoMetodologiaFase: number
  DataCadastro: Date
  DataAtividade: Date
  Carga: string
  Descricao: String
  Tags: String
  IdCoordenador: number
  InicioAtividade: String
  FimAtividade: String
}
