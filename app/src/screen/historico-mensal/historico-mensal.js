/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

import {
  Container,
  Divider
} from '@material-ui/core'

import moment from 'moment'

import DataPicker from './datepicker'
import HistoricoTable from './historico-table'
import HistoricoMobile from './historico-mobile'
import BarraProgresso from '../../components/barra-progresso'
import Cabecalho from '../../components/cabecalho'

import { atividadeApi } from '../../service/api-connection'


export default (props) => {
  const idColaborador = props.idColaborador || 2359

  const [historicoMensal, setHistoricoMensal] = useState([])
  const [mesReferencia, setMesReferencia] = useState(moment().startOf('month', 'day').utcOffset(false))

  const minDate = moment().startOf('month', 'day').subtract(1, 'month').utcOffset(false)
  const maxDate = moment().startOf('month', 'day').add(1, 'month').utcOffset(false)

  useEffect(() => {
    atividadeApi.atividadesByIdColaboradorMes(idColaborador, mesReferencia.format('MM/DD/YYYY'))
      .then(res => res
        ? setHistoricoMensal(res)
        : setHistoricoMensal([])
      )
  }, [mesReferencia])

  return (
    <>
      <Cabecalho />
      <Divider />
      <Container>
        <BarraProgresso mesReferencia={mesReferencia} />
        <div align='center'>
          <DataPicker
            minDate={minDate}
            maxDate={maxDate}
            onChange={setMesReferencia}
            value={mesReferencia} />
        </div>
        <HistoricoMobile historicoMensal={historicoMensal} />
        <HistoricoTable historicoMensal={historicoMensal} />
      </Container>
    </>
  )
}
