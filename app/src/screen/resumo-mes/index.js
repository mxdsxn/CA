import React, { useState, useEffect } from "react"
import { Container, Divider } from "@material-ui/core"

import Header from "../../components/header"
import ResumoMobile from "./resumo-mobile"
import ResumoDesktop from "./resumo-desktop"
import DataPicker from "./datepicker/"

import BarraProgresso from '../../components/barra-progresso'
import { atividadeApi } from '../../service/api-connection'
import moment from "moment"

export default (props) => {
  const mesVigente = moment()

  const [atividadesMes, setAtividadesMes] = useState([])
  const [mesReferencia, setMesReferencia] = useState(mesVigente)

  const handleDateChange = (date) => {
    setMesReferencia(moment(date))
  }

  useEffect(() => {
    atividadeApi.atividadesByIdColaboradorMes(2359, mesReferencia.utcOffset(0, true).format())
      .then(res => res ? setAtividadesMes(res) : setAtividadesMes([])
      )
  }, [mesReferencia])

  return (
    <>
      <Header />
      <Divider />
      <Container>
        <BarraProgresso mesReferencia={mesReferencia} />
        <div align="center">
          <DataPicker onChange={handleDateChange} value={mesReferencia} />
        </div>
        <ResumoMobile atvMes={atividadesMes} />
        <ResumoDesktop atvMes={atividadesMes} />
      </Container>
    </>
  )
}
