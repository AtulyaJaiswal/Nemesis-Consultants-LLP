import React from "react";
import { Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
import DetailsForm from './Components/DetailsForm';
import LogInPage from './Components/LogInPage';


function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={LogInPage} />
        <Route exact path="/detailsForm" component={DetailsForm} />
        <Route exact path="/home" component={Home} />
      </Switch>
    </>
  );
}

export default App;
