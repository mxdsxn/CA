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

import './style.css'

export default (props) => {
  const idColaborador = props.idColaborador || process.env.REACT_APP_ID_COL

  const mesAtual = moment().startOf('month', 'day').utcOffset(false)
  const mesMin = moment(mesAtual).startOf('year').utcOffset(false)

  const [historicoMensal, setHistoricoMensal] = useState([])
  const [mesReferencia, setMesReferencia] = useState(mesAtual)

  useEffect(() => {
    atividadeApi.atividadesByIdColaboradorMes(idColaborador, mesReferencia.format('YYYY-MM-DD'))
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
            minDate={mesMin}
            maxDate={mesAtual}
            onChange={setMesReferencia}
            value={mesReferencia} />
        </div>
        {
          historicoMensal.length > 0 ?
            <div className='historico'>
              <HistoricoMobile historicoMensal={historicoMensal} />
              <HistoricoTable historicoMensal={historicoMensal} />
            </div>
            : <div align='center'> Sem atividades cadastradas</div>
        }
      </Container>
    </>
  )
}
