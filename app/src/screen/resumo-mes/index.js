import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";

import ResumoMobile from "./resumo-mobile";
import ResumoDesktop from "./resumo-desktop";
import DataPicker from "./datepicker/";

import { default as apiConnection } from '../../service/api-connection'

export default (props) => {
  const mesVigente = new Date();

  const [atividadesMes, setAtividadesMes] = useState([]);
  const [mesReferencia, setMesReferencia] = useState(mesVigente);

  const handleDateChange = (date) => {
    setMesReferencia(date);
  };

  useEffect(() => {
    apiConnection.atividade.GetAtividadesMesByIdColaboradorMes(2359, mesReferencia)
      .then(res =>
        res ?
          setAtividadesMes(res) :
          setAtividadesMes([])
      )
  }, [mesReferencia])

  return (
    <Container>
      <div align="center">
        <DataPicker changeMes={handleDateChange} mes={mesReferencia} />
      </div>
      <ResumoMobile atvMes={atividadesMes} />
      <ResumoDesktop atvMes={atividadesMes} />
    </Container>
  );
};
