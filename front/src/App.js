import React from 'react';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login}/>
      </Switch>
    </div>
  );
}

export default App;
