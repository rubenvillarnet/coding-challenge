import React from 'react';
import UsersList from './components/UsersList'
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={UsersList}/>
      </Switch>
    </div>
  );
}

export default App;
