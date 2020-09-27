import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import moment from 'moment'
import AtividadeCard from './atividade-card'


export default function CustomizedExpansionPanels(props) {
  const [diaAtividade, setDiaAtividade] = useState(null)

  useEffect(() => {
    setDiaAtividade(props.diaAtividades)
  }, [props.diaAtividades])

  const removeAtividade = (idAtividade) => {
    setDiaAtividade(prevState => {
      return {
        Aberto: prevState.Aberto,
        Atividades: prevState.Atividades.filter(atv => atv.IdAtividade !== idAtividade),
        Descricao: prevState.Descricao,
        Dia: prevState.Dia

      }
    })
  }

  if (diaAtividade != null && diaAtividade.Atividades.length > 0) {
    return (
      <>
        <Typography variant='h6'>
          {moment(diaAtividade.Dia).utc().format('ddd, D MMMM, YYYY').toUpperCase()}
        </Typography>
        {
          diaAtividade.Atividades.map(atividade =>
            <>
              <AtividadeCard atividade={atividade} semanaAberta={diaAtividade.Aberto} onDelete={() => removeAtividade(atividade.IdAtividade)} />
            </>
          )
        }
      </>
    )
  } else
    return null
}
