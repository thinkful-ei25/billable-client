// 'use strict';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LandingPage from '../components/landingPage/LandingPage';
import Stats from './dashboard/Stats';
import MakeCall from './dashboard/MakeCall';
import Invoices from './dashboard/Invoices';
import navBar from '../components/dashboard/navbar/Navbar';
import Clients from './dashboard/Clients/Clients';
import Dashboard from './dashboard/dashboard';
import Contacts from './contactPage/contactPage';
import FormContainer from '../components/forms/FormContainer';

const AppRouter = () => (
  <div>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route path="/dashboard" component={navBar} />
    {/* <Route exact path="/dashboard" component={Dashboard} /> */}
    <Route exact path="/dashboard/stats" component={Stats} />
    <Route exact path="/dashboard/call" component={MakeCall} />
    <Route exact path="/dashboard/invoices" component={Invoices} />
    <Route exact path="/dashboard/clients" component={Clients} />
    <Route exact path="/dashboard/contacts" component={Contacts} />
    <Route path="/" component={FormContainer} />

  </div>
);

export default AppRouter;