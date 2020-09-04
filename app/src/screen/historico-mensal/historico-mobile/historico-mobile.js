import React from 'react'
import { Hidden } from '@material-ui/core'

import PainelDia from './dia-colapse'

export default (props) => {
  return (
    <Hidden smUp>
      <PainelDia historicoMensal={props.historicoMensal} />
    </Hidden>
  )
}