/* eslint-disable no-unused-vars */
import { AtividadeEntity } from '@entities'

export default interface DiaModel {
    Atividades?: AtividadeEntity[]
    Descricao: string;
    Dia: Date;
}