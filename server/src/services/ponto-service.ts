/* eslint-disable no-unused-vars */
import dbConnection  from '@database'
import { IPonto } from '@models'
import libUtc from '@libUtc'

/* retorna todos os pontos do mes do colaborador */
const GetPontoByIdColaboradorMes = async (idColaborador: Number, mesReferencia: Date) => {
  const mesReferenciaInicio = mesReferencia
  const mesReferenciaFim = libUtc.getEndMonth(mesReferenciaInicio)

  const listaPonto = await dbConnection('pessoas.Ponto')
    .select('*')
    .where('Data', '>=', mesReferenciaInicio)
    .andWhere('Data', '<=', mesReferenciaFim)
    .andWhere({
      IdColaborador: idColaborador
    })
    .orderBy('Data', 'asc')
    .then((listaPonto: IPonto[]) => listaPonto)

  return (listaPonto)
}
/* retorna todos os pontos do colaborador no dia */
const GetPontoByIdColaboradorDia = async (idColaborador: Number, diaReferencia: Date) => {
  const diaReferenciaInicio = diaReferencia
  const diaReferenciaFim = libUtc.getEndDate(diaReferenciaInicio)

  const listaPonto = await dbConnection('pessoas.Ponto')
    .select('*')
    .where('Data', '>=', diaReferenciaInicio)
    .andWhere('Data', '<=', diaReferenciaFim)
    .andWhere({
      IdColaborador: idColaborador
    })
    .orderBy('Data', 'asc')
    .then((listaPonto: IPonto[]) => listaPonto)

  return (listaPonto)
}

export default {
  GetPontoByIdColaboradorMes,
  GetPontoByIdColaboradorDia
}
