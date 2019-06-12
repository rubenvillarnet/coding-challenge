import React, { Component } from 'react'
import {connect} from 'react-redux';
import {listUsers,dismissUser, showSnackbar} from "../lib/redux/actions"
import DataProvider from "../lib/dataProvider"
import PropTypes from 'prop-types';

import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";
import "moment/locale/es";

import { Button, Typography, List, ListItem, ListItemText, FormControl, InputLabel, Input } from '@material-ui/core';

moment.locale("es");


class UserDetail extends Component {
  constructor(props){
    super(props)
    this.data = new DataProvider()
    this.state={
      edit: false,
      selectedDate: new Date()
    }
  }

  closeUserInfo(e){
    e.preventDefault()
    this.props.dismissUser()
  }

  handleDateChange(newDate) {
    this.setState({
      ...this.state,
      selectedDate: newDate
    })
  }

  editUser(e){
    e.preventDefault()
    const {name} = e.currentTarget.elements
    this.data.edituser({
      id: this.props.userInfo._id,
      name: name.value,
      birthdate: this.state.selectedDate
    }).then(editUserData => {
      if(editUserData.status === 200){
        const now = moment(new Date()).format("HH:mm")
        this.props.showSnackbar(`User updated at ${now}`)
      }else{
        this.props.showSnackbar(`Something wrong has happened. Status: ${editUserData.status}`)
      }
      name.value = ""
      this.setState({
        ...this.state,
        selectedDate: new Date()
      })
      this.props.listUsers()
    })
  }

  toggleEdit(){
    this.setState({
      ...this.state,
      edit: !this.state.edit
    })
  }

  render() {
    const { name, birthdate } = this.props.userInfo
    return (
      <div className="user-detail">
        <Typography variant="h5">User info</Typography>
        {this.state.edit?
          <form onSubmit={e => this.editUser(e)}>
            <FormControl className="form-control">
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                required={true}
                defaultValue={name}
                type="text"
                id="name"/>
            </FormControl>
            <KeyboardDatePicker
                      label="Birthday"
                      value={birthdate}
                      onChange={(newDate)=> this.handleDateChange(newDate)}
                      animateYearScrolling
                      disableFuture
                      format="DD/MM/YYYY"
                    />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          className="update-button">
          Update User
        </Button>
          </form>
          :<List>
          <ListItem><ListItemText primary="Name:" secondary={name}/> </ListItem>
          <ListItem><ListItemText primary="Birthdate:" secondary={birthdate}/></ListItem>
        </List>}
        
        <Button
          variant="contained"
          color="primary"
          onClick={e=> this.toggleEdit()}
          >{this.state.edit?"Cancel":"Edit"}</Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={e => this.closeUserInfo(e)}
          className="close-button"
          >Close</Button>
      </div>
    )
  }
}

UserDetail.propTypes = {
  userInfo: PropTypes.shape({
    name: PropTypes.string,
    birthdate: PropTypes.string
  }),
  dismissUser: PropTypes.func ,
  showSnackbar: PropTypes.func 
}

const mapStateToProps = state => {
  const { users } = state
  return { userInfo: users.userInfo };
};

const mapDispatchToProps = {
  listUsers,
  dismissUser,
  showSnackbar
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail)
