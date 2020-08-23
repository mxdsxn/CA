type ProjetoMetodologiaFaseEntity = {
  IdProjetoMetodologiaFase: Number,
  IdProjetoMetodologia: Number,
  Fase: String,
  Padrao: Boolean,
  Ativa: Boolean,
  JustificativaAdaptacao: String,
  Adaptado: Boolean,
  Ordem: Number,
  HorasPrevistas: Number
}

export default ProjetoMetodologiaFaseEntity