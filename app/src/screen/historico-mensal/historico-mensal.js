import React, { useState, useEffect } from "react"

import {
  Container,
  Divider
} from "@material-ui/core"

import moment from "moment"

import DataPicker from "./datepicker"
import HistoricoTable from "./historico-table"
import HistoricoMobile from "./historico-mobile"
import BarraProgresso from '../../components/barra-progresso'
import Cabecalho from "../../components/cabecalho"

import { atividadeApi } from '../../service/api-connection'


export default (props) => {
  const idColaborador = props.idColaborador || 2359
  const mesVigente = moment.utc()

  const [historicoMensal, setHistoricoMensal] = useState([])
  const [mesReferencia, setMesReferencia] = useState(mesVigente)

  const handleDateChange = (date) => {
    setMesReferencia(moment.utc(date))
  }

  useEffect(() => {
    atividadeApi.atividadesByIdColaboradorMes(idColaborador, mesReferencia.utcOffset(0, true).format())
      .then(res => res ? setHistoricoMensal(res) : setHistoricoMensal([])
      )
  }, [mesReferencia])

  return (
    <>
      <Cabecalho />
      <Divider />
      <Container>
        <BarraProgresso mesReferencia={mesReferencia} />
        <div align="center">
          <DataPicker onChange={handleDateChange} value={mesReferencia} />
        </div>
        <HistoricoMobile historicoMensal={historicoMensal} />
        <HistoricoTable historicoMensal={historicoMensal} />
      </Container>
    </>
  )
}
