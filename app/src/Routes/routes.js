import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {Hidden} from '@material-ui/core'

import MonthResume from "../screen/MonthResume";
import IncluirAtv from "../screen/IncluirAtividade";
import FecharSem from "../screen/FecharSemana";
import NavBar from "../components/BottomNav";

export default () => {
  const [valueNavBar, setValueNavBar] = React.useState();
  return (
    <BrowserRouter>
      <Switch>
        <Route>
          <Route
            path="/resumoMes"
            render={(props) => <MonthResume setValueNavBar={setValueNavBar} />}
          />
          <Route
            path="/incluirAtv"
            render={(props) => <IncluirAtv setValueNavBar={setValueNavBar} />}
          />
          <Route
            path="/fecharSem"
            render={(props) => <FecharSem setValueNavBar={setValueNavBar} />}
          />
        </Route>
      </Switch>
      <Hidden mdUp>
        <NavBar valueNavBar={valueNavBar} />
      </Hidden>
    </BrowserRouter>
  );
};
