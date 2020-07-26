import React from "react"
import "./style.css"
import { format } from 'date-fns'
import { TableCell, TableRow, TableBody, Hidden } from "@material-ui/core"

export default (props) => {

  if (props.atvMes != null && props.atvMes.length > 0) {
    return (
      <TableBody>
        {
          props.atvMes.map((dia) => (
            dia.atividadesDia.length === 0 ?
              (
                <TableRow key={dia.dia}>
                  <TableCell> {format(new Date(
                    Date.UTC(
                      new Date(dia.dia).getUTCFullYear(),
                      new Date(dia.dia).getUTCMonth(),
                      new Date(dia.dia).getUTCDate(),
                      + new Date(dia.dia).getHours(),
                      0,
                      0,
                      0
                    )), "d/MM/yyyy")} </TableCell>
                  <TableCell colSpan={11} align="center">
                    {
                      dia.descricao
                        ? dia.descricao
                        : "-"
                    }
                  </TableCell>
                </TableRow >
              ) :
              <>
                <TableCell rowSpan={dia.atividadesDia.length + 1}> {format(new Date(
                  Date.UTC(
                    new Date(dia.dia).getUTCFullYear(),
                    new Date(dia.dia).getUTCMonth(),
                    new Date(dia.dia).getUTCDate(),
                    + new Date(dia.dia).getHours(),
                    0,
                    0,
                    0
                  )), "d/MM/yyyy")} </TableCell>
                {
                  dia.atividadesDia.map(atv => (
                    <TableRow>
                      <TableCell>{atv.Projeto}</TableCell>
                      <Hidden mdDown>
                        <TableCell>{atv.FaseProjeto || "-"}</TableCell>
                        <TableCell>{atv.CategoriaAtividade || "-"}</TableCell>
                        <TableCell>{atv.Tags || "-"}</TableCell>
                      </Hidden>
                      <Hidden smDown>
                        <TableCell>{format(new Date(
                          Date.UTC(
                            new Date(atv.DataCadastro).getUTCFullYear(),
                            new Date(atv.DataCadastro).getUTCMonth(),
                            new Date(atv.DataCadastro).getUTCDate(),
                            + new Date(atv.DataCadastro).getHours(),
                            0,
                            0,
                            0
                          )), "d/MM/yyyy")}</TableCell>
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
          ))
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
