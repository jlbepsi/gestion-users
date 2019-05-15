import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Main from './components/Main'
import ScrollToTop from './components/ScrollTop'
import UtilisateurEdit from "./components/editform/UtilisateurEdit";
import UtilisateursImport from "./components/import/UtilisateursImport";
import UtilisateurNew from "./components/editform/UtilisateurNew";

export default props => (
  <Router>
    <ScrollToTop>
      <Switch>
        <Route exact path='/' component={ Dashboard } />
        <Route exact path='/ldap' component={ Main } />
        <Route exact path='/ldap/new' component={ UtilisateurNew } />
        <Route exact path='/ldap/:login' component={ UtilisateurEdit } />
        <Route exact path='/import' component={ UtilisateursImport } />
      </Switch>
    </ScrollToTop>
  </Router>
)