import React from "react";
import "./style.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core/";

import FecharSemana from '../../../screen/fechar-semana'

export default () => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button className="botoes" variant="outlined" color="primary" onClick={handleClickOpen}>
        Fechar Semanas
        </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Fechar Semanas
          </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Lista de semanas a fechar
            </DialogContentText>
          <FecharSemana />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

