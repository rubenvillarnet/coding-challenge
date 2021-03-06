import dataprovider from '../dataprovider'
import { DISMISS_USER, LIST_USERS, GET_USER, SHOW_SNACKBAR, HIDE_SNACKBAR } from './action-types'

const data = new dataprovider()

export const dismissUser = () => {
  return {
    type: DISMISS_USER,
    setToNull: null
  }
}

export const listUsers = () => {
  return dispatch => {
    return data.listUsers().then(userData => dispatch({ type: LIST_USERS, userData }))
  }
}

export const getUser = id => {
  return dispatch => {
    return data
      .getUser(id)
      .then(userInfo => dispatch({ type: GET_USER, userInfo: userInfo }))
      .catch(error => error)
  }
}

export const showSnackbar = message => {
  return {
    type: SHOW_SNACKBAR,
    message: message
  }
}

export const hideSnackbar = () => {
  return {
    type: HIDE_SNACKBAR
  }
}
