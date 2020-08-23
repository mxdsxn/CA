/* eslint-disable no-unused-vars */
import { PontoRepository as Repo } from '@repositories'

/* retorna todos os pontos do mes do colaborador */
const PontoByIdColaboradorMes = async (idColaborador: Number, mesReferencia: Date) => {
  const listaPonto = await Repo.PontoByIdColaboradorMes(idColaborador, mesReferencia)

  return listaPonto
}
/* retorna todos os pontos do colaborador no dia */
const PontoByIdColaboradorDia = async (idColaborador: Number, diaReferencia: Date) => {
  const listaPonto = await Repo.PontoByIdColaboradorDia(idColaborador, diaReferencia)

  return listaPonto
}

export default {
  PontoByIdColaboradorMes,
  PontoByIdColaboradorDia
}
