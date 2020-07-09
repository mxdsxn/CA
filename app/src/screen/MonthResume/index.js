import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";

import ResumoCard from "./ResumoCard";
import ResumoTable from "./ResumoTable";
import Datepic from "./Datepic/";

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
        <Datepic changeMes={handleDateChange} mes={mesReferencia} />
      </div>
      <ResumoCard atvMes={atividadesMes} />
      <ResumoTable atvMes={atividadesMes} />
    </Container>
  );
};
