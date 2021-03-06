import React, { Component } from 'react'
import dataprovider from '../../lib/dataprovider'
import PropTypes from 'prop-types'
import { formatDate, formatTime } from '../../lib/utils'
import { KeyboardDatePicker } from '@material-ui/pickers'

import { Button, Typography, List, ListItem, ListItemText, FormControl, InputLabel, Input } from '@material-ui/core'

export default class UserDetail extends Component {
  constructor(props) {
    super(props)
    this.data = new dataprovider()
    this.state = {
      edit: false,
      selectedDate: new Date()
    }
  }

  closeUserInfo(e) {
    e.preventDefault()
    this.props.dismissUser()
  }

  handleDateChange(newDate) {
    this.setState({
      ...this.state,
      selectedDate: newDate
    })
  }

  editUser(e) {
    e.preventDefault()
    const { name } = e.currentTarget.elements
    this.data
      .edituser({
        id: this.props.userInfo._id,
        name: name.value,
        birthdate: this.state.selectedDate
      })
      .then(editUserData => {
        if (editUserData.status === 200) {
          const now = formatTime(new Date())
          this.props.showSnackbar(`User updated at ${now}`)
        } else {
          this.props.showSnackbar(`Something wrong has happened. Status: ${editUserData.status}`)
        }
        name.value = ''
        this.setState({
          ...this.state,
          selectedDate: new Date()
        })
        this.props.listUsers()
      })
  }

  toggleEdit() {
    this.setState({
      ...this.state,
      edit: !this.state.edit
    })
  }

  render() {
    const { userInfo, classes } = this.props
    const { name, birthdate } = userInfo
    return (
      <div>
        <Typography variant="h5">User info</Typography>
        {this.state.edit ? (
          <form onSubmit={e => this.editUser(e)} className={classes.form}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input required={true} defaultValue={name} type="text" id="name" />
            </FormControl>
            <KeyboardDatePicker label="Birthday" value={birthdate} onChange={newDate => this.handleDateChange(newDate)} disableFuture format="DD/MM/YYYY" />
            <Button type="submit" color="primary" variant="contained" className={classes.updateButton}>
              Update User
            </Button>
          </form>
        ) : (
          <List>
            <ListItem>
              <ListItemText primary="Name:" secondary={name} />{' '}
            </ListItem>
            <ListItem>
              <ListItemText primary="Birthdate:" secondary={formatDate(birthdate)} />
            </ListItem>
          </List>
        )}

        <Button variant="contained" color="primary" onClick={() => this.toggleEdit()}>
          {this.state.edit ? 'Cancel' : 'Edit'}
        </Button>
        <Button variant="contained" color="secondary" onClick={e => this.closeUserInfo(e)} className={classes.closeButton}>
          Close
        </Button>
      </div>
    )
  }
}

UserDetail.propTypes = {
  userInfo: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    birthdate: PropTypes.string
  }),
  dismissUser: PropTypes.func,
  showSnackbar: PropTypes.func,
  listUsers: PropTypes.func,
  classes: PropTypes.object
}
