import React, { Component } from 'react'

import { AppBar, Toolbar, Typography } from '@material-ui/core';

export default class Topbar extends Component {
  render() {
    return (
      <AppBar position="static" className="Topbar">
        <Toolbar className="top-bar">
          <Typography variant="h6" className="title">React Test</Typography>
        </Toolbar>
      </AppBar>
    )
  }
}