import React from 'react'

import {
  Container,
  Image
} from 'react-bootstrap/'

import {
  AppBar,
  Typography,
  Hidden,
  IconButton,
  makeStyles,
  Toolbar
} from '@material-ui/core/'
import MenuIcon from '@material-ui/icons/Menu'

import MenuCabecalho from '../menu-cabecalho'
import './style.css'

import logo_full from './dextra-mutant-logo-novo.png'
import logo from './dextra-logo-novo-180x180.png'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  colorDefault: {
    background: '#ffffff',
    color: '#000000',
  },
}))

export default () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.colorDefault}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Container align='center'>
              <Hidden smDown>
                <Image src={logo_full} width={130} fluid align='center' />
              </Hidden>
              <Hidden mdUp>
                <Image src={logo} width={50} fluid align='center' />
              </Hidden>
            </Container>
          </Typography>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuCabecalho iconMenu={MenuIcon} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}
