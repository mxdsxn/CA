import dbConnection from '@database'
import libUtc from '@libUtc'

const ContratosByDataIdColaboradorMes = async (idColaborador: Number, mesReferencia: Date) => {
    const mesReferenciaInicio = mesReferencia
    const mesReferenciaFim = libUtc.getEndMonth(mesReferenciaInicio)

    return await dbConnection('pessoas.ColaboradorContrato')
        .where('IdColaborador', Number(idColaborador))
        .andWhere(function () {
            this.where('Termino', '>=', mesReferenciaInicio)
                .orWhere('Termino', null)
        })
        .andWhere('DataInicioContrato', '<=', mesReferenciaFim)
        .select('*')
        .orderBy('DataInicioContrato', 'asc')
}

const ContratoAtivoByIdColaboradorDia = async (idColaborador: Number, diaReferencia: Date) => {
    const diaReferenciaInicio = diaReferencia
    const diaReferenciaFim = libUtc.getEndDate(diaReferenciaInicio)

    return await dbConnection('pessoas.ColaboradorContrato')
        .where('IdColaborador', idColaborador)
        .andWhere('DataInicioContrato', '<=', diaReferenciaFim)
        .andWhere(function () {
            this.where('Termino', '>=', diaReferenciaInicio)
                .orWhere('Termino', null)
        })
        .select('*')
        .orderBy('DataInicioContrato', 'desc')
        .first()
}

export default {
    ContratosByDataIdColaboradorMes,
    ContratoAtivoByIdColaboradorDia
}
