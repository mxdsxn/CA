import React, { useState, useEffect } from "react";
import "./style.css";
import tema from "./style";

import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import ptbrLocale from "date-fns/locale/pt-BR";

export default (props) => {
  const pt_br = ptbrLocale;

  const diaHoje = new Date()
  const inicioDatePicker = new Date("04/01/2019");
  const fimDatePicker = new Date(`${diaHoje.getUTCMonth() + 1}/1/${diaHoje.getUTCFullYear()}`)

  const [selectedDate, handleDateChange] = useState(new Date());

  useEffect(() => (props.onChangeDiaAtividade(selectedDate)), [props, selectedDate])

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={pt_br}>
      <ThemeProvider
      // theme={tema}
      >
        <DatePicker
          // className="dataP"
          variant="inline"
          label="Selecione o dia da atividade"
          autoOk={true}
          minDate={inicioDatePicker}
          maxDate={fimDatePicker}
          disableToolbar
          value={selectedDate}
          onChange={handleDateChange}
        />
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
};
