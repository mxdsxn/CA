import React from 'react'
import { Divider } from '@material-ui/core'

import Cabecalho from '../../components/cabecalho'
import FormularioCadastro from './formulario-cadastro'

export default (props) => {

  return (
    <>
      <Cabecalho />
      <Divider />
      <FormularioCadastro />
    </>
  )
}
