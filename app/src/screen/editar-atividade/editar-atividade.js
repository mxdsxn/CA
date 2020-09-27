import React from 'react'
import { useHistory } from 'react-router-dom'
import { Divider } from '@material-ui/core'

import Cabecalho from '../../components/cabecalho'
import FormularioEdicao from './formulario-edicao'

export default (props) => {
  const history = useHistory()

  if (!props.history.location.idAtividade) {
    history.push('cadastro-atividade')
    return null
  } else
    return (
      <>
        <Cabecalho />
        <Divider />
        <FormularioEdicao idAtividade={props.history.location.idAtividade} />
      </>
    )
}
