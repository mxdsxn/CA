/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import libUtc from '@libUtc'
import { CalendarioEntity } from '@entities'

const FeriadosByMes = async (idColaborador: number, mesReferencia: Date): Promise<CalendarioEntity[]> => {
  const mesReferenciaInicio = mesReferencia
  const mesReferenciaFim = libUtc.getEndMonth(mesReferenciaInicio)

  return await dbConnection('pessoas.Colaborador')
    .innerJoin('pessoas.PostoTrabalho', 'pessoas.PostoTrabalho.IdPostoTrabalho', 'pessoas.Colaborador.IdPostoTrabalho')
    .innerJoin('pessoas.Calendario', function () {
      this.on('pessoas.PostoTrabalho.IdCidade', 'pessoas.Calendario.IdCidade')
        .orOn('pessoas.PostoTrabalho.IdEstado', 'pessoas.Calendario.IdEstado')
        .orOn('pessoas.PostoTrabalho.IdPais', 'pessoas.Calendario.IdPais')
    })
    .where('pessoas.Colaborador.IdColaborador', idColaborador)
    .andWhere('pessoas.Calendario.Dia', '>=', mesReferenciaInicio)
    .andWhere('pessoas.Calendario.Dia', '<', mesReferenciaFim)
    .select('pessoas.Calendario.*')
    .orderBy('pessoas.Calendario.Dia', 'asc')
}

const feriadoByIdColaboradorDia = async (idColaborador: number, dia: string): Promise<CalendarioEntity> => {
  return dbConnection('pessoas.Colaborador')
    .innerJoin('pessoas.PostoTrabalho', 'pessoas.PostoTrabalho.IdPostoTrabalho', 'pessoas.Colaborador.IdPostoTrabalho')
    .innerJoin('pessoas.Calendario', function () {
      this.on('pessoas.Calendario.IdCidade', 'pessoas.PostoTrabalho.IdCidade')
        .orOn('pessoas.Calendario.IdEstado', 'pessoas.PostoTrabalho.IdEstado')
        .orOn('pessoas.Calendario.IdPais', 'pessoas.PostoTrabalho.IdPais')
    })
    .where({
      'pessoas.Colaborador.IdColaborador': idColaborador,
      'pessoas.Calendario.Dia': dia,
    })
    .select('pessoas.Calendario.*')
    .first()
}

const listaFeriadoNaoUtilByIdColaboradorDia = async (idColaborador: number, dia: string): Promise<CalendarioEntity[]> => {
  return dbConnection('pessoas.Colaborador')
    .innerJoin('pessoas.PostoTrabalho', 'pessoas.PostoTrabalho.IdPostoTrabalho', 'pessoas.Colaborador.IdPostoTrabalho')
    .innerJoin('pessoas.Calendario', function () {
      this.on('pessoas.Calendario.IdCidade', 'pessoas.PostoTrabalho.IdCidade')
        .orOn('pessoas.Calendario.IdEstado', 'pessoas.PostoTrabalho.IdEstado')
        .orOn('pessoas.Calendario.IdPais', 'pessoas.PostoTrabalho.IdPais')
    })
    .where({
      'pessoas.Colaborador.IdColaborador': idColaborador,
      'pessoas.Calendario.Dia': dia,
      'pessoas.Calendario.HorasUteis': 0
    })
    .select('pessoas.Calendario.*')
    .orderBy('pessoas.Calendario.Dia', 'asc')
}

export default {
  feriadoByIdColaboradorDia,
  FeriadosByMes,
  listaFeriadoNaoUtilByIdColaboradorDia
}
