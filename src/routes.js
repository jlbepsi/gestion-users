import React from 'react'
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'

import Dashboard from './components/Dashboard'
import Main from './components/Main'
import ScrollToTop from './components/ScrollTop'
import UtilisateurEdit from "./components/editform/UtilisateurEdit";
import UtilisateursImport from "./components/import/UtilisateursImport";
import UtilisateurNew from "./components/editform/UtilisateurNew";
import NotFound from "./components/NotFound";
import MainLayout from "./components/layouts/MainLayout";
import EmptyLayout from "./components/layouts/EmptyLayout";
import Login from "./components/security/Login";
import Logout from "./components/security/Logout";

export default props => (
  <Router>
    <ScrollToTop>
      <Switch>
        <Redirect
          exact
          from="/"
          to="/dashboard"
        />
        <MainLayout exact path='/dashboard' component={ Dashboard } />
        <MainLayout exact path='/ldap' component={ Main } />
        <MainLayout exact path='/ldap/new' component={ UtilisateurNew } />
        <MainLayout exact path='/ldap/:login' component={ UtilisateurEdit } />
        <MainLayout exact path='/import' component={ UtilisateursImport } />

        <EmptyLayout exact path='/login' component={ Login } />
        <Route exact path='/logout' component={ Logout } />

        <Route
          component={NotFound}
          exact
          path="/not-found"
        />
        <Redirect to="/not-found" />
      </Switch>
    </ScrollToTop>
  </Router>
)