import React from "react";
import "./style.css";

import { TableCell, TableRow, TableBody, Hidden } from "@material-ui/core";

export default (props) => {

  const tst = () => {
    const listaAtividades = props.atvMes
    console.log(listaAtividades)
  }
  tst()

  if (props.atvMes != null && props.atvMes.length > 0) {
    return (
      <TableBody>
        {props.atvMes.map((d) => (
          <TableRow key={d.IdAtividade}>
            <TableCell>{d.DataAtividade}</TableCell>
            <TableCell>{d.Projeto}</TableCell>
            <Hidden mdDown>
              <TableCell>{d.Fase}</TableCell>
              <TableCell>{d.Categoria}</TableCell>
              <TableCell>{d.Tags}</TableCell>
            </Hidden>
            <Hidden smDown>
              <TableCell>{d.DataCadastro}</TableCell>
            </Hidden>
            <TableCell>{d.Descricao}</TableCell>
            <TableCell>{d.Carga}</TableCell>
            <Hidden mdDown>
              <TableCell>{d.CargaTotal}</TableCell>
              <TableCell>{d.CargaContrato}</TableCell>
            </Hidden>
            <TableCell>{d.Status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  } else {
    return (
      <TableBody>
        <TableRow key={1}>
          <TableCell colSpan={11} align="center">
            Nenhuma atividade cadastrada nesse mês
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }
};
