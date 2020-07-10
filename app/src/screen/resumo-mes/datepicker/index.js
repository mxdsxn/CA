import React from "react";
import "./style.css";
import tema from "./style";

import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import ptbrLocale from "date-fns/locale/pt-BR";

export default (props) => {
  const pt_br = ptbrLocale;

  const inicioAtividades = new Date("04/01/2019");
  const fimAtividades = new Date();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={pt_br}>
      <ThemeProvider
        theme={tema}
      >
        <DatePicker
          className="dataP"
          variant="inline"
          label="Selecione o mês"
          autoOk={true}
          minDate={inicioAtividades}
          maxDate={fimAtividades}
          openTo="month"
          views={["year", "month"]}
          value={props.mes}
          onChange={props.changeMes}
        />
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
};
