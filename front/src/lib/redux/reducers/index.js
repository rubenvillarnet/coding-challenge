import { combineReducers } from 'redux'

import { users } from './users'
import { snackbar } from './snackbar'

export default combineReducers({
  users,
  snackbar
})
