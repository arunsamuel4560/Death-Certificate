import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import PolicyForm from './PolicyForm';
import VerifierLogin from './VerifierLogin';
import VerifierRegistration from './VerifierRegistration';

function Router() {
  return (
    <BrowserRouter>
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
        <Route path="/">
          <PolicyForm />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
