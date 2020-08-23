import dbConnection from '@database'
import libUtc from '@libUtc'

const AtividadesByIdColaboradorMes = async (idColaborador: number, mesReferencia: Date): Promise<any> => {
    const mesReferenciaInicio = mesReferencia
    const mesReferenciaFim = libUtc.getEndMonth(mesReferenciaInicio)

    return await dbConnection('pessoas.Atividade')
        .innerJoin('operacoes.Projeto', 'operacoes.Projeto.IdProjeto', 'pessoas.Atividade.IdProjeto')
        .fullOuterJoin('operacoes.ProjetoCategoriaAtividade', 'operacoes.ProjetoCategoriaAtividade.IdProjetoCategoriaAtividade', 'pessoas.Atividade.IdProjetoCategoriaAtividade')
        .fullOuterJoin('operacoes.ProjetoMetodologiaFase', 'operacoes.ProjetoMetodologiaFase.IdProjetoMetodologiaFase', 'pessoas.Atividade.IdProjetoMetodologiaFase')
        .where('pessoas.Atividade.IdColaborador', idColaborador)
        .andWhere('pessoas.Atividade.DataAtividade', '>=', mesReferenciaInicio)
        .andWhere('pessoas.Atividade.DataAtividade', '<', mesReferenciaFim)
        .select(
            'pessoas.Atividade.*',
            'operacoes.Projeto.Nome',
            'operacoes.ProjetoCategoriaAtividade.Descricao as Categoria',
            'operacoes.ProjetoMetodologiaFase.Fase'
        )
        .orderBy('pessoas.Atividade.DataAtividade', 'asc')
}

const AtividadesByIdColaboradorDia = async (idColaborador: Number, diaReferencia: Date): Promise<any> => {
    return await dbConnection('pessoas.Atividade')
        .innerJoin('operacoes.Projeto', 'operacoes.Projeto.IdProjeto', 'pessoas.Atividade.IdProjeto')
        .fullOuterJoin('operacoes.ProjetoCategoriaAtividade', 'operacoes.ProjetoCategoriaAtividade.IdProjetoCategoriaAtividade', 'pessoas.Atividade.IdProjetoCategoriaAtividade')
        .fullOuterJoin('operacoes.ProjetoMetodologiaFase', 'operacoes.ProjetoMetodologiaFase.IdProjetoMetodologiaFase', 'pessoas.Atividade.IdProjetoMetodologiaFase')
        .where('pessoas.Atividade.IdColaborador', idColaborador)
        .andWhere('pessoas.Atividade.DataAtividade', diaReferencia)
        .select(
            'pessoas.Atividade.*',
            'operacoes.Projeto.Nome',
            'operacoes.ProjetoCategoriaAtividade.Descricao as Categoria',
            'operacoes.ProjetoMetodologiaFase.Fase'
        )
        .orderBy('pessoas.Atividade.DataAtividade', 'asc')
}

export default {
    AtividadesByIdColaboradorDia,
    AtividadesByIdColaboradorMes
}
