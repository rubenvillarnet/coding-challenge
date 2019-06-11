import React, { Component } from 'react'
import { connect } from 'react-redux';
import { listUsers, getUser, dismissUser, showSnackbar } from "../lib/redux/actions"
import UserDetail from './UserDetail';
import Topbar from './Topbar';
import DataProvider from "../lib/dataProvider"
import PropTypes from 'prop-types';


import {
  Typography, Drawer, FormControl, InputLabel,
  Input, Button, Paper, Table, TableHead, TableRow,
  TableCell, TableBody, Modal, Fab
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';


class UsersList extends Component {
  constructor(props) {
    super(props)
    this.data = new DataProvider()
    this.state = {
      rightDrawer: false
    }
  }

  componentDidMount() {
    this.props.listUsers(this.props.page)
  }

  showUserInfo(e, id) {
    e.preventDefault()
    this.props.getUser(id)
  }

  createUser(e) {
    e.preventDefault()
    const { name, birthdate } = e.currentTarget.elements
    this.data.newUser({
      name: name.value,
      birthdate: birthdate.value
    }).then(newUserData => {
      this.toggleDrawer(false)
      if (newUserData.status === 200) {
        const timestamp = new Date(newUserData.data.createdAt)
        const now = `${timestamp.getHours()}:${(timestamp.getMinutes() < 10 ? '0' : '')}${timestamp.getMinutes()}`
        this.props.showSnackbar(`User created at ${now} with id ${newUserData.data.id}`)
      } else {
        this.props.showSnackbar(`Something wrong has happened. Status: ${newUserData.status}`)
      }
    })
    name.value = ""
    birthdate.value = ""
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
          {userData.data ?
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
                    {userData.data.map(user => {
                      return <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.birthdate}</TableCell>
                        <TableCell><Button 
                          onClick={e => this.showUserInfo(e, user.id)}
                          color="primary"><AddIcon />Info</Button></TableCell>
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
                    <FormControl className="form-control">
                      <InputLabel htmlFor="birthdate">Birthdate</InputLabel>
                      <Input
                        type="text"
                        id="birthdate"
                      />
                    </FormControl>
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
  userData: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      birthdate: PropTypes.string
    })),
  }),
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
