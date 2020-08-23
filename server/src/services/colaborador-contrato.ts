import { ColaboradorContratoRepository as Repo } from '@repositories'

/* retorna lista de contratos num mes para calculo de horas */
const ContratosByDataIdColaboradorMes = async (idColaborador: Number, mesReferencia: Date) => {
  const listaContrato = await Repo.ContratosByDataIdColaboradorMes(idColaborador, mesReferencia)

  return listaContrato
}

/* retorna contrato ativo no dia para carga horaria diaria */
const ContratoAtivoByIdColaboradorDia = async (idColaborador: Number, diaReferencia: Date) => {
  const contratoAtivo = await Repo.ContratoAtivoByIdColaboradorDia(idColaborador, diaReferencia)

  return contratoAtivo
}

export default {
  ContratosByDataIdColaboradorMes,
  ContratoAtivoByIdColaboradorDia
}
