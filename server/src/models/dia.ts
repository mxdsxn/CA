/* eslint-disable no-unused-vars */
import { AtividadeEntity } from '@entities'
import { Moment } from 'moment';

export default interface DiaModel {
    Atividades?: AtividadeEntity[]
    Descricao: string | null;
    Dia: Moment;
    Aberto?: boolean;
}
