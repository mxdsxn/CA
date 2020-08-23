import dbConnection from '@database'
import libUtc from '@libUtc'

const CoordenadoresByDia = async (diaReferencia: Date) => {
    const mesReferenciaInicio = libUtc.getMonth(diaReferencia)
    const mesReferenciaFim = libUtc.getEndMonth(diaReferencia)

    return await dbConnection('pessoas.Colaborador')
        .innerJoin('operacoes.ProjetoHistoricoGerente', 'operacoes.ProjetoHistoricoGerente.IdColaborador', 'pessoas.Colaborador.IdColaborador')
        .where('operacoes.ProjetoHistoricoGerente.DataInicio', '<', mesReferenciaFim)
        .andWhere(function () {
            this.where('DataFim', '>=', mesReferenciaInicio)
                .orWhere('DataFim', null)
        })
        .select(
            'pessoas.Colaborador.IdColaborador',
            'pessoas.Colaborador.Nome'
        )
        .orderBy('pessoas.Colaborador.Nome', 'asc')
        .distinct()
}

export default {
    CoordenadoresByDia
}