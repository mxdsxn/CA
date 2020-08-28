export default interface AtividadeModel {
    IdAtividade: number
    IdColaborador: number
    IdProjeto: number
    IdProjetoCategoriaAtividade: number
    IdProjetoMetodologiaFase: number
    DataCadastro: Date
    DataAtividade: Date
    Carga: string
    Descricao: string
    Tags: string
    IdCoordenador: number
    InicioAtividade: string
    FimAtividade: string
    NomeProjeto: string
    Categoria: string
    Fase: string
}
