import React from "react"

import {
  Container,
  Image
} from "react-bootstrap/"

import {
  AppBar,
  Hidden,
  makeStyles,
  Toolbar
} from "@material-ui/core/"

import logo_full from "./dextra-mutant-logo-novo.png"
import logo from "./dextra-logo-novo-180x180.png"

import "./style.css"

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
    background: "#ffffff",
    color: "#000000",
  },
}))

export default () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.colorDefault}>
        <Toolbar>
          <Container align="center">
            <Hidden smDown>
              <Image src={logo_full} width={130} fluid align="center" />
            </Hidden>
            <Hidden mdUp>
              <Image src={logo} width={50} fluid align="center" />
            </Hidden>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  )
}
