import express from "express";
import connKnex from "@database/connection";

import AtividadeController from "@controllers/Atividade";
const atividadeController = new AtividadeController();
import CalendarioController from "@controllers/Calendario";
const calendarioController = new CalendarioController();
import RegistroAuxiliarController from "@controllers/RegistroAuxiliar";
const registroAuxiliarController = new RegistroAuxiliarController();
import PontoController from "@controllers/Ponto";
const pontoController = new PontoController();
import ContratoController from "@controllers/ColaboradorContrato";
const contratoController = new ContratoController();

const routes = express.Router();

routes.post(
  "/GetAtividadesByDataColaboradores",
  atividadeController.GetAtividadesByDataColaboradores
);

routes.post("/GetFeriadosByData", calendarioController.GetFeriadosByData);

routes.post(
  "/GetRegistroAuxiliarByData",
  registroAuxiliarController.GetRegistroAuxiliarByData
);

routes.post("/GetPontoByDataId", pontoController.GetPontoByDataId);

routes.post("/GetContratosByDataId", contratoController.GetContratosByDataId);

export default routes;
