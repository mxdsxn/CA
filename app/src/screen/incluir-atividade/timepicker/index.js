import React, { useState } from "react";

import { MuiPickersUtilsProvider, KeyboardTimePicker } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import ptbrLocale from "date-fns/locale/pt-BR";

export default () => {
  const [selectedDate, handleDateChange] = useState("2018-01-01T00:00:00.000Z");
  const pt_br = ptbrLocale;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={pt_br}>
      <ThemeProvider
      // theme={tema}
      >
        <KeyboardTimePicker
          ampm={false}
          variant="inline"
          label="With keyboard"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
}