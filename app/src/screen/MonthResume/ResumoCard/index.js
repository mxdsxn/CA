import React from "react";
import { Hidden } from "@material-ui/core";
import PainelDia from "./PainelDia";

export default (props) => {
  return (
    <Hidden smUp>
      <PainelDia atvMes={props.atvMes} />
    </Hidden>
  );
};
