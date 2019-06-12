import React, { Component } from 'react'
import { connect } from 'react-redux';
import { listUsers, getUser, dismissUser, showSnackbar } from "../lib/redux/actions"
import UserDetail from './UserDetail';
import Topbar from './Topbar';
import DataProvider from "../lib/dataProvider"
import PropTypes from 'prop-types';

import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";
import "moment/locale/es";


import {
  Typography, Drawer, FormControl, InputLabel,
  Input, Button, Paper, Table, TableHead, TableRow,
  TableCell, TableBody, Modal, Fab
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

moment.locale("es");

class UsersList extends Component {
  constructor(props) {
    super(props)
    this.data = new DataProvider()
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
    this.data.deleteUser(id)
    .then(info => {

      this.props.showSnackbar(`User ${info.name} was deleted sucessfuly.`)
      
      this.props.listUsers()
    })
  }

  createUser(e) {
    e.preventDefault()
    const { name } = e.currentTarget.elements
    this.data.newUser({
      name: name.value,
      birthdate: this.state.selectedDate
    }).then(newUserData => {
      this.toggleDrawer(false)
      if (newUserData.status === 200) {
        const now = moment(new Date()).format("HH:mm")
        this.props.showSnackbar(`User "${newUserData.data.name}" created at ${now} with id ${newUserData.data._id}`)
      } else {
        this.props.showSnackbar(`Something wrong has happened. Status: ${newUserData.status}`)
      }
      name.value = ""
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

    const { userData, userInfo} = this.props
    return (
      <React.Fragment>
       <Topbar />
        <div className="Content">
          {userData.length !== 0?
            <div className="table-container">
              <Typography component="h1" variant="h4" className="title">Users list</Typography>
              <Paper className="paper">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className="row-title">First Name</TableCell>
                      <TableCell className="row-title">Birthdate</TableCell>
                      <TableCell className="row-title">More Info</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userData.map(user => {
                      return <TableRow key={user._id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.birthdate}</TableCell>
                        <TableCell><Button 
                          onClick={e => this.showUserInfo(e, user._id)}
                          color="primary"><AddIcon />Info</Button></TableCell>
                          <TableCell><Button 
                          onClick={e => this.deleteUser(e, user._id)}
                          color="primary"><AddIcon />Delete</Button></TableCell>
                      </TableRow>
                    })}
                  </TableBody>
                </Table>
              </Paper>

              <Fab
                variant="extended"
                color="primary"
                aria-label="Add"
                className="new-user-button"
                onClick={() => this.toggleDrawer(true)}>
                <AddIcon />
                New User
              </Fab>
              <Drawer
                className="drawer"
                anchor="right"
                open={this.state.rightDrawer}
                onClose={() => this.toggleDrawer(false)}>
                <div className="new-user-container">
                  <Paper className="form-container">
                  <Typography component="h2" variant="h6" align="center">Create new user</Typography>
                  <form
                    className="new-user-form"
                    onSubmit={e => this.createUser(e)}>
                    <FormControl className="form-control">
                      <InputLabel htmlFor="name">Name</InputLabel>
                      <Input
                        type="text"
                        id="name"
                      />
                    </FormControl>
                    <KeyboardDatePicker
                      label="Birthday"
                      value={this.state.selectedDate}
                      onChange={(newDate)=> this.handleDateChange(newDate)}
                      animateYearScrolling
                      disableFuture
                      format="DD/MM/YYYY"
                    />
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained">
                      Create User
                     </Button>
                  </form>
                  </Paper>
                  <Fab
                    color="secondary"
                    className="close-button"
                    onClick={() => this.toggleDrawer(false)}>
                    <CloseIcon />
                  </Fab>
                </div>
              </Drawer>
            </div>
            : <p>Loading...</p>}
          <Modal
            open={!!userInfo}
            onClose={() => this.props.dismissUser()}
            className="modal-overlay">
            <Paper className="modal-box">
              {userInfo ? <UserDetail /> : null}
            </Paper>
          </Modal>
        </div>
      </React.Fragment>
    )
  }
}

UsersList.propTypes = {
  user: PropTypes.object,
  userData: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      birthdate: PropTypes.string
    })),
  userInfo: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  listUsers: PropTypes.func,
  getUser: PropTypes.func,
  dismissUser: PropTypes.func,
  showSnackbar: PropTypes.func 
}

const mapDispatchToProps = {
  listUsers,
  getUser,
  dismissUser,
  showSnackbar
}

const mapStateToProps = state => {
  const { userData, userInfo } = state.users
  return {
    userData,
    userInfo
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList)
