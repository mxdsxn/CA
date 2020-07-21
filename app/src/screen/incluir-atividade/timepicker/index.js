import React, { useState } from "react";

import { MuiPickersUtilsProvider, KeyboardTimePicker } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import ptbrLocale from "date-fns/locale/pt-BR";

export default (props) => {
  const dataInicio = new Date("01/01/1900")
  const cargaReferencia = new Date(
    Date.UTC(
      dataInicio.getUTCFullYear(),
      dataInicio.getUTCMonth(),
      dataInicio.getUTCDate() + 1,
      -1,
      0,
      0,
      0
    )
  )

  const pt_br = ptbrLocale;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={pt_br}>
      <ThemeProvider
      // theme={tema}
      >
        <KeyboardTimePicker
          ampm={false}
          variant="standard"
          label="Seleciona a carga da atividade"
          value={props.value}
          onChange={props.onChange}
          autoOk
        />
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
}