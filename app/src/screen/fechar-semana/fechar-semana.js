import React from 'react'

import Cabecalho from '../../components/cabecalho'
import FormularioFecharSemana from './formulario-fechar-semana'

import {
  Container,
  Divider,
  Paper
} from '@material-ui/core'

export default (props) => {
  return (
    <>
      <Cabecalho />
      <Divider />
      <Container align='center'>
        <Paper elevation={3}>
          <FormularioFecharSemana />
        </Paper>
      </Container>
    </>
  )
}
