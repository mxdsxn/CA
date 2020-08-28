import React from "react"
import "./style.css"

import {
  Hidden,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core"

export default () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Data</TableCell>
        <TableCell>Projeto</TableCell>
        <Hidden mdDown>
          <TableCell>Fase</TableCell>
          <TableCell>Categoria</TableCell>
          <TableCell>Tags</TableCell>
        </Hidden>
        <Hidden smDown>
          <TableCell>Data de Cadastro</TableCell>
        </Hidden>
        <TableCell>Descrição</TableCell>
        <TableCell>Carga</TableCell>
        <Hidden mdDown>
          <TableCell>Ponto</TableCell>
          <TableCell>Total</TableCell>
        </Hidden>
        <TableCell>Status</TableCell>
      </TableRow>
    </TableHead>
  )
}
