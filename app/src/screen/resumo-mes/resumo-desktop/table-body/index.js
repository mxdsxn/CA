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
        {props.atvMes.map((dia) => (
          dia.atividadesDia.length === 0 ?
            (<TableRow key={dia.dia}>
              <TableCell> {dia.dia} </TableCell>
              <TableCell> Sem atividades nesse dia </TableCell>
            </TableRow >) :
            <>
              <TableCell rowSpan={dia.atividadesDia.length+1}> {dia.dia} </TableCell>
              {
                dia.atividadesDia.map(atv => (
                  <TableRow>
                    <TableCell>{atv.Projeto}</TableCell>
                    <Hidden mdDown>
                      <TableCell>{atv.Fase}</TableCell>
                      <TableCell>{atv.Categoria}</TableCell>
                      <TableCell>{atv.Tags}</TableCell>
                    </Hidden>
                    <Hidden smDown>
                      <TableCell>{atv.DataCadastro}</TableCell>
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
