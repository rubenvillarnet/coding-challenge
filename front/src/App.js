import React from 'react'
import UsersList from './components/UsersList'
import { Switch, Route } from 'react-router-dom'
import SnackbarBottom from './components/SnackbarBottom'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={UsersList} />
      </Switch>
      <SnackbarBottom />
    </div>
  )
}

export default App
