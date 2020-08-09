/* eslint-disable no-unused-vars */
import { IAtividade } from '@models'

export default interface DiaEntity {
    Atividades?: IAtividade[]
    Descricao: String;
    Dia: Date;
}
