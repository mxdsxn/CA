import { createMuiTheme } from "@material-ui/core";
const tema = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: "#ee9658",
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        backgroundColor: "#ee9658",
        color: "white",
      },
    },
    MuiPickersDay: {
      day: {
        color: "#ee9658",
      },
      daySelected: {
        backgroundColor: "#ee9658",
      },
      dayDisabled: {
        color: "#ee9658",
      },
      current: {
        color: "#ee9658",
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: "#",
      },
    },
  },
});

export default tema;
