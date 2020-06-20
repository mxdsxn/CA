import { Request, Response } from "express";

import connKnex from "@database/connection";
import IColaboradorContrato from "@models/ColaboradorContrato";

export default class ContratoControler {
  async GetContratosByDataId(req: Request, res: Response) {
    const { Data, IdColab } = req.query;

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

    let listaContrato: IColaboradorContrato[];
    listaContrato = await connKnex
      .select("*")
      .from(`pessoas.ColaboradorContrato`)
      .where(`IdColaborador`, Number(IdColab))
      .andWhere(function () {
        this.where(`Termino`, `>=`, mesReferenciaInicio).orWhere(
          `Termino`,
          null
        );
      })
      .andWhere(`DataInicioContrato`, `<`, mesReferenciaFim);

    res.json(listaContrato);
  }
}
