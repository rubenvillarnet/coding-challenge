import React, { Component } from 'react'
import UserDetail from '../UserDetail'
import Topbar from '../TopBar'
import dataprovider from '../../lib/dataprovider'
import { formatDate, formatTime } from '../../lib/utils'

import PropTypes from 'prop-types'

import { KeyboardDatePicker } from '@material-ui/pickers'

import {
  Typography,
  Drawer,
  FormControl,
  InputLabel,
  Input,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Modal,
  Fab
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

export default class UsersList extends Component {
  constructor(props) {
    super(props)
    this.data = new dataprovider()
    this.state = {
      rightDrawer: false,
      selectedDate: new Date()
    }
  }

  componentDidMount() {
    this.props.listUsers()
  }

  showUserInfo(e, id) {
    e.preventDefault()
    this.props.getUser(id)
  }

  handleDateChange(newDate) {
    this.setState({
      ...this.state,
      selectedDate: newDate
    })
  }

  deleteUser(e, id) {
    e.preventDefault()
    this.data.deleteUser(id).then(info => {
      this.props.showSnackbar(`User ${info.name} was deleted sucessfuly.`)

      this.props.listUsers()
    })
  }

  createUser(e) {
    e.preventDefault()
    const { name } = e.currentTarget.elements
    this.data
      .newUser({
        name: name.value,
        birthdate: this.state.selectedDate
      })
      .then(newUserData => {
        this.toggleDrawer(false)
        if (newUserData.status === 200) {
          const now = formatTime(new Date())
          this.props.showSnackbar(`User ${newUserData.data.name} created at ${now} with id ${newUserData.data._id}`)
        } else {
          this.props.showSnackbar(`Something wrong has happened. Status: ${newUserData.status}`)
        }
        name.value = ''
        this.setState({
          ...this.state,
          selectedDate: new Date()
        })
        this.props.listUsers()
      })
  }

  toggleDrawer(shown) {
    this.setState({
      ...this.state,
      rightDrawer: shown
    })
  }

  render() {
    const { userData, userInfo, classes } = this.props
    if (!Array.isArray(userData)) return <p>We're sorry but an error has ocurred in the server.</p>
    return (
      <React.Fragment>
        <Topbar />
        <div className={classes.content}>
          {userData.length !== 0 ? (
            <div className={classes.tableContainer}>
              <Typography component="h1" variant="h4" className={classes.title}>
                Users list
              </Typography>
              <Paper className={classes.title}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.rowTitle}>First Name</TableCell>
                      <TableCell className={classes.rowTitle}>Birthdate</TableCell>
                      <TableCell className={classes.rowTitle}>More Info</TableCell>
                      <TableCell className={classes.rowTitle}>Delete user</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userData.map(user => {
                      return (
                        <TableRow key={user._id}>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{formatDate(user.birthdate)}</TableCell>
                          <TableCell>
                            <Button onClick={e => this.showUserInfo(e, user._id)} color="primary">
                              <AccountCircleIcon />
                              Info
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button onClick={e => this.deleteUser(e, user._id)} color="secondary" variant="contained">
                              <DeleteIcon />
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </Paper>

              <Fab variant="extended" color="primary" aria-label="Add" className={classes.newUserButton} onClick={() => this.toggleDrawer(true)}>
                <AddIcon />
                New User
              </Fab>
              <Drawer className={classes.drawer} anchor="right" open={this.state.rightDrawer} onClose={() => this.toggleDrawer(false)}>
                <div className={classes.NewUserContainer}>
                  <Paper className={classes.formContainer}>
                    <Typography component="h2" variant="h6" align="center">
                      Create new user
                    </Typography>
                    <form className={classes.newUserForm} onSubmit={e => this.createUser(e)}>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <Input type="text" id="name" required />
                      </FormControl>
                      <KeyboardDatePicker
                        label="Birthday"
                        value={this.state.selectedDate}
                        onChange={newDate => this.handleDateChange(newDate)}
                        disableFuture
                        format="DD/MM/YYYY"
                      />
                      <Button className={classes.createUserButton} type="submit" color="primary" variant="contained">
                        Create User
                      </Button>
                    </form>
                  </Paper>
                  <Fab color="secondary" className={classes.closeButton} onClick={() => this.toggleDrawer(false)}>
                    <CloseIcon />
                  </Fab>
                </div>
              </Drawer>
            </div>
          ) : (
            <p>Loading...</p>
          )}
          <Modal open={!!userInfo} onClose={() => this.props.dismissUser()} className={classes.modalOverlay}>
            <Paper className={classes.modalBox}>{userInfo ? <UserDetail /> : null}</Paper>
          </Modal>
        </div>
      </React.Fragment>
    )
  }
}

UsersList.propTypes = {
  user: PropTypes.object,
  userData: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        birthdate: PropTypes.string
      })
    ),
    PropTypes.object
  ]),
  userInfo: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  listUsers: PropTypes.func,
  getUser: PropTypes.func,
  dismissUser: PropTypes.func,
  showSnackbar: PropTypes.func,
  classes: PropTypes.object
}
