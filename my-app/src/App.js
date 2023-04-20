import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './NavBar';
import PolicyForm from './PolicyForm';
import VerifierLogin from './VerifierLogin';
import VerifierRegistration from './RegistrationForm';
import HomePage from './HomePage'

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path="/policy-form">
            <PolicyForm />
          </Route>
          <Route path="/verifier-login">
            <VerifierLogin />
          </Route>
          <Route path="/verifier-registration">
            <VerifierRegistration />
          </Route>
          <Route path="/home-page">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
