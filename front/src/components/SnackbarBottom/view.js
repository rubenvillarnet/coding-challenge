import React, { Component } from 'react'

import PropTypes from 'prop-types';

import { Snackbar, Button } from '@material-ui/core';

export default class SnackbarBottom extends Component {

  render() {
    const {status, message, hideSnackbar} = this.props
    return (
      <Snackbar 
            anchorOrigin={{
              horizontal: "center",
              vertical: "bottom"}}
            autoHideDuration={10000}
            open= {status}
            onClose= {()=>hideSnackbar()}
            message={message}
            action={[
              <Button
              color="secondary"
              size="small"
              key="undo"
              onClick={()=>hideSnackbar()}
              >Close
              </Button>
            ]}
              />
    )
  }
}

SnackbarBottom.propTypes = {
  status: PropTypes.bool,
  message: PropTypes.string,
  hideSnackbar: PropTypes.func
}