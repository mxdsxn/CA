import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core/";

import IncluirAtv from "../../../screen/incluir-atividade";

import "./style.css";

export default () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        className="botoes"
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        Incluir Atividades
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Cadastrar atividades</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Formulario de atividades
          </DialogContentText>
          <IncluirAtv />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
