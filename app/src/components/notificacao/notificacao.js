import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert';


const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default (props) => {
  const [open, setOpen] = React.useState(props.show)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    props.onClose()
    setOpen(false)
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert severity={props.data.tipo === 'Sucesso' ? 'success' : 'error'}>
          {props.data.mensagem[0]}
        </Alert>
      </Snackbar>
    </div>
  )
}
