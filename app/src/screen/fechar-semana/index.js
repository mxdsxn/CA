import React from "react";
import { Container, Paper } from "@material-ui/core";

export default (props) => {
  if (props.setValueNavBar) {
  }
  return (
    <Container align="center">
      <Paper elevation={3}>
        <h1>Fechar Semana</h1>
      </Paper>
    </Container>
  );
};
