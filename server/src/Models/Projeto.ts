export default interface Projeto {
  IdProjeto: Number,
  IdProjetoStatus: Number,
  Nome: String,
  IdProjetoTipo: Number,
  IdCliente: Number,
  Responsavel: String,
  IdColaborador: Number,
  IdColaboradorGerente: Number,
  IdColaboradorGerenteDes: Number,
  IdColaboradorBizDev: Number,
  IdColaboradorDiretor: Number,
  DataInicial: Date,
  DataFinalAceite: Date,
  DataFinalGarantia: Date,
  IdProjetoAreaExecutora: Number,
  IdProjetoAreaNegocio: Number,
  IdProjetoTipoServico: Number,
  IdProjetoMercado: Number,
  IdProjetoTipoUnidade: Number,
  TamanhoPrevisto: Number,
  HorasPrevistas: Number,
  ProdutividadePrevista: Number,
  OrcamentoVenda: Number,
  CalculaRetrabalho: Boolean,
  PDI: Boolean,
  ControlaCronograma: Boolean,
  Problema: String,
  Solucao: String,
  Tecnologia: String,
  Metodologia: Boolean,
  AlocacaoRecursos: Boolean,
  Milestones: Boolean,
  Comunicacao: Boolean,
  Riscos: Boolean,
  Pendencias: Boolean,
  PlanoFinanceiro: Boolean,
  RAGStatus: Boolean,
  DataCriacao: Date,
  DataInicioGerente: Date,
  CspVenda: Number,
  TFSCollection: String,
  TFSProjeto: String,
  PeriodicidadeAcompanhamento: Number,
  PontosPositivos: String,
  PontosNegativos: String,
  SugestaoMelhoriaProcesso: String,
  PeriodicidadeAcompanhamentoCliente: Number,
  NomeParceiro: String,
  Comissao: Number,
  DataRealEntrega: Date,
  MissaoProjeto: String,
  FaturamentoVendaProjeto: Number,
  IdProjetoRiscoTolerancia: Number,
  DataAtualizacaoProjetoRiscoTolerancia: Date,
  ResponsavelAtualizacaoProjetoRiscoTolerancia: Number,
  idMoedas: Number,
  Atestado: Boolean,
  DataInicioBizDev: Date,
  IdProjetoPMA: Number,
}