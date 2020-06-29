import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Hidden } from '@material-ui/core'

import MonthResume from "../screen/MonthResume";
import IncluirAtv from "../screen/IncluirAtividade";
import FecharSem from "../screen/FecharSemana";
import NavBar from "../components/BottomNav";

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route>
          <Route
            path="/resumoMes"
            render={(props) => <MonthResume />}
          />
          <Route
            path="/incluirAtv"
            render={(props) => <IncluirAtv />}
          />
          <Route
            path="/fecharSem"
            render={(props) => <FecharSem />}
          />
        </Route>
      </Switch>
      <Hidden mdUp>
        <NavBar />
      </Hidden>
    </BrowserRouter>
  );
};
