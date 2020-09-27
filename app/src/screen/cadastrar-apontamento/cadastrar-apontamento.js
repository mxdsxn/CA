import React from 'react'
import { Divider } from '@material-ui/core'

import Cabecalho from '../../components/cabecalho'
import FormularioApontamento from './formulario-apontamento'

export default (props) => {

  return (
    <>
      <Cabecalho />
      <Divider />
      <FormularioApontamento />
    </>
  )
}
