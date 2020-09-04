import React from "react";

import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

import { ThemeProvider } from "@material-ui/styles";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import ptbrLocale from "date-fns/locale/pt-BR";

export default (props) => {

  const pt_br = ptbrLocale;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={pt_br}>
      <ThemeProvider /* theme={tema}*/>
        <KeyboardTimePicker
          fullWidth={props.fullWidth || false}
          ampm={false}
          variant="standard"
          label="Seleciona a carga da atividade"
          value={props.value}
          onChange={props.onChange}
          autoOk
        />
      </ThemeProvider>
    </MuiPickersUtilsProvider >
  );
}