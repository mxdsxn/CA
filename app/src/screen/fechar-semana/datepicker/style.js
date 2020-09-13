import { createMuiTheme } from '@material-ui/core'
const tema = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#00ed39',
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        backgroundColor: '#00ed39',
        color: 'white',
      },
    },
    MuiPickersDay: {
      day: {
        color: '#00ed39',
      },
      daySelected: {
        backgroundColor: '#00ed39',
      },
      dayDisabled: {
        color: '#00ed39',
      },
      current: {
        color: '#00ed39',
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: '#',
      },
    },
  },
})

export default tema
