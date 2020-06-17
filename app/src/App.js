import React from "react";
import Routes from "./Routes/routes";
import Header from "./components/Header";
import Actions from "./components/Actions";
import ProgressBar from "./components/ProgressBar";
import { Divider, Hidden } from "@material-ui/core";

export default () => (
  <div className="App">
    <Header />
    <ProgressBar />
    
    <Hidden smDown>
      <Actions />
    </Hidden>
    
    <Divider />
    
      <Routes />

  </div>
);
