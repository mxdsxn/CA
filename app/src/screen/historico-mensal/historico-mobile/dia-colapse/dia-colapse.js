import React from 'react'

// import { withStyles } from '@material-ui/core/styles'
// import MuiExpansionPanel from '@material-ui/core/ExpansionPanel'
// import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
// import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'

import moment from 'moment'

import AtividadeCard from './atividade-card'

// const ExpansionPanel = withStyles({
//   root: {
//     border: '1px solid rgba(0, 0, 0, .125)',
//     boxShadow: 'none',
//     '&:not(:last-child)': {
//       borderBottom: 0,
//     },
//     '&:before': {
//       display: 'none',
//     },
//     '&$expanded': {
//       margin: 'auto',
//     },
//   },
//   expanded: {},
// })(MuiExpansionPanel)

// const ExpansionPanelSummary = withStyles({
//   root: {
//     backgroundColor: 'rgba(0, 0, 0, .03)',
//     borderBottom: '1px solid rgba(0, 0, 0, .125)',
//     marginBottom: -1,
//     minHeight: 56,
//     '&$expanded': {
//       minHeight: 56,
//     },
//   },
//   content: {
//     '&$expanded': {
//       margin: '12px 0',
//     },
//   },
//   expanded: {},
// })(MuiExpansionPanelSummary)

// const ExpansionPanelDetails = withStyles((theme) => ({
//   root: {
//     padding: theme.spacing(2),
//   },
// }))(MuiExpansionPanelDetails)

export default function CustomizedExpansionPanels(props) {
  // const [expanded, setExpanded] = React.useState()

  // const handleChange = (panel) => (event, newExpanded) => {
  //   setExpanded(panel)
  // }

  if (props.historicoMensal != null && props.historicoMensal.length > 0) {
    return (
      <>
        {props.historicoMensal.map((dia) => (
          dia.Atividades.length === 0 ? null : (
            <>
              <Typography variant='h6'>
                {moment(dia.Dia).utc().format('ddd, D MMMM, YYYY').toUpperCase()}
              </Typography>
              {console.log(dia)}
              {
                dia.Atividades.map(atividade =>
                  <>
                    <AtividadeCard atividade={atividade} semanaAberta={dia.Aberto} />
                  </>
                )
              }
            </>
          )
        ))
        }
      </>
    )
  } else
    return <div> -  Nenhuma atividade registrada  - </div>
}
