import React from "react";
import { Container, Table, Paper, Hidden } from "@material-ui/core";

import THead from "./THead";
import TBody from "./TBody";
import TFoot from "./TFoot";

export default (props) => {
  return (
    <Container>
      <Hidden xsDown>
        <Paper elevation={3}>
          <Table striped="true" bordered="true" hover="true">
            <THead />
            <TBody atvMes={props.atvMes} />
            <TFoot />
          </Table>
        </Paper>
      </Hidden>
    </Container>
  );
};
