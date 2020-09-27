import React, { useState, useEffect } from 'react'
import { Hidden } from '@material-ui/core'

import PainelDia from './dia-colapse'

export default (props) => {
  const [atividadesMes, setAtividadesMes] = useState([])

  useEffect(() => {
    setAtividadesMes(props.historicoMensal)
  }, [props.historicoMensal])

  return (
    <Hidden smUp>
      {atividadesMes.map(dia => <PainelDia diaAtividades={dia} />)}
    </Hidden>
  )
}
