import React from 'react'

import './style.css'

import {
  Hidden,
  TableCell,
  TableFooter,
  TableRow
} from '@material-ui/core'

export default () => {
  return (
    <TableFooter>
      <TableRow>
        <TableCell>-</TableCell>
        <TableCell>-</TableCell>
        <Hidden mdDown>
          <TableCell>-</TableCell>
          <TableCell>-</TableCell>
          <TableCell>-</TableCell>
        </Hidden>
        <Hidden smDown>
          <TableCell>-</TableCell>
        </Hidden>
        <TableCell>-</TableCell>
        <TableCell>-</TableCell>
        <Hidden mdDown>
          <TableCell>-</TableCell>
          <TableCell>-</TableCell>
        </Hidden>
        <TableCell>-</TableCell>
      </TableRow>
    </TableFooter>
  )
}
