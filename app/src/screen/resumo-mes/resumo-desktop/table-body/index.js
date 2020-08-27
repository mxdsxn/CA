import React from "react"
import "./style.css"
import moment from 'moment'

import {
  Hidden,
  TableCell,
  TableBody,
  TableRow
} from "@material-ui/core"

export default (props) => {
  console.log(props.atvMes)

  if (props.atvMes != null && props.atvMes.length > 0) {
    return (
      <TableBody>
        {
          props.atvMes.map((dia) => {
            if (dia.Atividades.length === 0) {
              return (
                <TableRow key={dia.Dia}>
                  <TableCell> {moment(dia.Dia).utc().format('L')} </TableCell>
                  <TableCell colSpan={11} align="center">
                    {
                      dia.Descricao
                        ? dia.Descricao
                        : "-"
                    }
                  </TableCell>
                </TableRow >
              )
            }
            else {
              return (
                <>
                  <TableCell rowSpan={dia.Atividades.length + 1}>{moment(dia.Dia).utc().format('L')}</TableCell>
                  {
                    dia.Atividades.map(atv => (
                      <TableRow>
                        <TableCell>{atv.NomeProjeto}</TableCell>
                        <Hidden mdDown>
                          <TableCell>{atv.Fase || "-"}</TableCell>
                          <TableCell>{atv.Categoria || "-"}</TableCell>
                          <TableCell>{atv.Tags || "-"}</TableCell>
                        </Hidden>
                        <Hidden smDown>
                          <TableCell>{moment(atv.DataCadastro).utc().format('L')}</TableCell>
                        </Hidden>
                        <TableCell>{atv.Descricao}</TableCell>
                        <TableCell>{atv.Carga}</TableCell>
                        <Hidden mdDown>
                          <TableCell>{atv.CargaTotal}</TableCell>
                          <TableCell>{atv.CargaContrato}</TableCell>
                        </Hidden>
                        <TableCell>{atv.Status}</TableCell>
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
          <TableCell colSpan={11} align="center">
            Nenhuma atividade cadastrada nesse mês
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }
}
