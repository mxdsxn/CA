import dbConnection from '@database'
import libUtc from '@libUtc'

const FeriadosByMes = async (idColaborador: number, mesReferencia: Date) => {
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

export default {
    FeriadosByMes
}