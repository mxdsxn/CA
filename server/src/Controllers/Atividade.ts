import { Request, Response } from "express";

import connKnex from "@database/connection";
import IAtividade from "@models/Atividade";

export default class AtividadeController {
  async GetAtividadesByDataColaboradores(req: Request, res: Response) {
    const { IdColab, Data } = req.query;
    console.log(req.query);
    const mesReferenciaInicio = new Date(String(Data));
    const mesReferenciaFim =
      mesReferenciaInicio.getMonth() < 11
        ? new Date(
            `${
              mesReferenciaInicio.getMonth() + 2
            }/1/${mesReferenciaInicio.getFullYear()}`
          )
        : mesReferenciaInicio.getMonth() == 11
        ? new Date(`1/1/${mesReferenciaInicio.getFullYear() + 1}`)
        : new Date();
    let atividadesMes: IAtividade[];
    atividadesMes = await connKnex
      .select("*")
      .from(`pessoas.Atividade`)
      .where({
        IdColaborador: IdColab,
      })
      .where(`DataAtividade`, `>=`, mesReferenciaInicio)
      .andWhere(`DataAtividade`, `<`, mesReferenciaFim);
    console.log(atividadesMes);
    res.json(atividadesMes);
  }
}
