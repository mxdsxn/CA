/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'

import { Container } from '@material-ui/core'
import { ProgressBar } from 'react-bootstrap'

import { colaboradorApi } from '../../service/api-connection'

import './style.css'

export default (props) => {
  const mesReferencia = props.mesReferencia
  const idColaborador = props.idColaborador || process.env.REACT_APP_ID_COL

  const calculaValoresBarra = (res) => {
    const uteisMes = res.horasUteisMes
    const uteisHoje = res.horasUteisHoje
    const cadastradas = res.horasCadastradasAteHoje

    const cadastradaPorCento = 100 * cadastradas / uteisMes
    const uteisHojePorCento = 100 * uteisHoje / uteisMes

    if (uteisHoje !== 0) {
      if (cadastradaPorCento < uteisHojePorCento) {
        setCadastradas(cadastradaPorCento)
        setFaltaCadastrar(uteisHojePorCento - cadastradaPorCento)
        setRestante(100 - uteisHojePorCento)
      } else if (cadastradaPorCento > uteisHojePorCento) {
        setCadastradas(cadastradaPorCento)
        setFaltaCadastrar(0)
        setRestante(100 - cadastradaPorCento)
      } else if (cadastradaPorCento === 100) {
        setCadastradas(cadastradaPorCento)
        setFaltaCadastrar(0)
        setRestante(0)
      }
    } else {
      setCadastradas(cadastradaPorCento)
      setFaltaCadastrar(100 - cadastradaPorCento)
      setRestante(0)
    }

    // horas extras
    if (uteisMes < cadastradas) {
      const horasExtra = 100 * (cadastradas - uteisMes) / uteisMes
      setExtra(horasExtra)
    } else
      setExtra(0)
  }

  React.useEffect(() => {
    colaboradorApi.dadosBarraProgresso(idColaborador, mesReferencia.utcOffset(0, true).format())
      .then(res => {
        if (res) {
          calculaValoresBarra(res)
        } else {
          calculaValoresBarra({
            horasCadastradasAteHoje: 0,
            horasUteisHoje: 0,
            horasUteisMes: 0
          })
        }
      })
  }, [mesReferencia])

  const [cadastradas, setCadastradas] = React.useState()
  const [faltaCadastrar, setFaltaCadastrar] = React.useState()
  const [restante, setRestante] = React.useState()
  const [extra, setExtra] = React.useState()

  return (
    <Container>
      <ProgressBar className='barra-progresso'>
        <ProgressBar variant='success' now={cadastradas} key={2} />
        <ProgressBar animated variant='success' now={faltaCadastrar} key={1} />
        <ProgressBar animated now={restante} key={3} />
        <ProgressBar variant='warning' now={extra} key={4} />
      </ProgressBar>
    </Container>
  )
}
