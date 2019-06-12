import React, { Component } from 'react'
import HealthCheck from '../../lib/healthCheck'

import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

export default class Topbar extends Component {
  constructor(props){
    super(props)
    this.health = new HealthCheck()
  }

  checkDB(){
    this.health.status()
    .then(result =>{
      this.props.showSnackbar(`Database status: ${result.isAlive?"online":"offline"}`)
    })
  }

  render() {
    const { classes } = this.props
    return (
      <AppBar position="static">
        <Toolbar className={classes.toolBar}>
          <Typography variant="h6">React Test</Typography>
          <Button
          variant="contained"
          size="small"
          onClick={()=>this.checkDB()}>Check database</Button>
        </Toolbar>
      </AppBar>
    )
  }
}