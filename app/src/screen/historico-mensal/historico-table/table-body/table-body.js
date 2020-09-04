import React from 'react'

import {
  Hidden,
  TableCell,
  TableBody,
  TableRow
} from '@material-ui/core'

import moment from 'moment'

import './style.css'

export default (props) => {
  if (props.historicoMensal != null && props.historicoMensal.length > 0) {
    return (
      <TableBody>
        {
          props.historicoMensal.map((dia) => {
            if (dia.Atividades.length === 0) {
              return (
                <TableRow key={dia.Dia}>
                  <TableCell> {moment(dia.Dia).utc().format('L')} </TableCell>
                  <TableCell colSpan={11} align='center'>
                    {dia.Descricao || '-'}
                  </TableCell>
                </TableRow >
              )
            }
            else {
              return (
                <>
                  <TableCell rowSpan={dia.Atividades.length + 1}>{moment(dia.Dia).utc().format('L')}</TableCell>
                  {
                    dia.Atividades.map(atividade => (
                      <TableRow>
                        <TableCell>{atividade.NomeProjeto}</TableCell>
                        <Hidden mdDown>
                          <TableCell>{atividade.Fase || '-'}</TableCell>
                          <TableCell>{atividade.Categoria || '-'}</TableCell>
                          <TableCell>{atividade.Tags || '-'}</TableCell>
                        </Hidden>
                        <Hidden smDown>
                          <TableCell>{moment(atividade.DataCadastro).utc().format('L')}</TableCell>
                        </Hidden>
                        <TableCell>{atividade.Descricao}</TableCell>
                        <TableCell>{atividade.Carga}</TableCell>
                        <Hidden mdDown>
                          <TableCell>{atividade.CargaTotal}</TableCell>
                          <TableCell>{atividade.CargaContrato}</TableCell>
                        </Hidden>
                        <TableCell>{atividade.Status}</TableCell>
                      </TableRow>
                    ))
                  }
                </>
              )
            }
          })
        }
      </TableBody>
    )
  } else {
    return (
      <TableBody>
        <TableRow key={1}>
          <TableCell colSpan={11} align='center'>
            Nenhuma atividade cadastrada nesse mês
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }
}
