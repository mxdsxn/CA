import React from "react";
import "./style.css";
import { Image, Container } from "react-bootstrap/";
import logo from "./logo-sm.svg";

import { AppBar, Toolbar, makeStyles } from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  colorDefault: {
    background: "#002C4F",
    color: "#f0ad4e",
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.colorDefault}>
        <Toolbar>
          <Container align="center">
            <Image src={logo} width={50} fluid align="center" />
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
};
