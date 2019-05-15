import React, { Component } from 'react';
import {Link as RouterLink} from "react-router-dom";

import Button from "@material-ui/core/Button/index";
import AddIcon from '@material-ui/icons/AddCircle';

import UtilisateursTable from "./UtilisateursTable";
import UtilisateursFilterBar from "./UtilisateursFilterBar";
import UtilisateursAPI from "../../api/UtilisateursAPI";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "../share/SnackbarContentWrapper";





class UtilisateursUI extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // Liste des utilisateurs
      users: [],
      classe: '',
      nomUser: '',
      bts: false,
      openSnackBar: false,
      snackbarIcon: '',
      snackbarMessage: ''
    };

    // API Users
    this.utilisateursAPI = new UtilisateursAPI();

    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeactivate = this.handleDeactivate.bind(this);
    this.handleDeleteMany = this.handleDeleteMany.bind(this);
    this.handleDeactivateMany = this.handleDeactivateMany.bind(this);
    this.handleCloseSnackBar = this.handleCloseSnackBar.bind(this);
  }



  handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ openSnackBar: false });
  };

  componentDidMount() {
    /** TODO : Remove test */
    this.utilisateursAPI.getUsersClasse('B3')
      .then(data => {
        this.setState({users: data})
      })
      .catch(err => {
        this.setState({ snackbarIcon: "error" });
        this.setState({ snackbarMessage: "Erreur : " + err.message });
        this.setState({ openSnackBar: true });
      });
  }

  removeUserFromList(login) {
    let data = this.state.users.filter(u => u.login !== login);

    this.setState({users: data})
  }

  handleChangeValue(name, value) {
    this.setState({ [name]: value });

    console.log(name + "=" + value);

    if (name === 'classe') {
      this.utilisateursAPI.getUsersClasse(value)
          .then(data => {
            this.setState({users: data})
          });
    }
  }

  openSnackbar(icon, message) {
    this.setState({ snackbarIcon: icon });
    this.setState({ snackbarMessage: message });
    this.setState({ openSnackBar: true });
  }

  handleChangePassword = (login, password) => {

    this.utilisateursAPI.changePassword(login, password)
      .then(() => {
        this.openSnackbar("success", "Mot de passe changé !");
      })
      .catch(err => {
        console.error('Request failed', err);
        this.openSnackbar("error", "Une erreur est survenue dans le changement du mot de passe !");
      });
  };

  handleDelete = (login) => {
    this.utilisateursAPI.deleteUser(login)
      .then(data => {
        this.openSnackbar("success", "Utilisateur supprimé !");

        this.removeUserFromList(login);
      })
      .catch(err => {
        console.error('Request failed', err);

        this.openSnackbar("error", "Une erreur est survenue dans la suppression !");
      });
  };

  handleActivate = (login) => {

    this.utilisateursAPI.activateUser(login)
      .then(data => {
        // TODO Faire la recherche de l'utilisateur pour changer son état actif
        this.openSnackbar("success", "Utilisateur activé !");
      })
      .catch(err => {
        console.error('Request failed', err);
        this.openSnackbar("error", "Une erreur est survenue dans la modification !");
      });
  };

  handleDeactivate = (login) => {

    this.utilisateursAPI.deactivateUser(login)
      .then(data => {
        // TODO Faire la recherche de l'utilisateur pour changer son état actif
        this.openSnackbar("success", "Utilisateur désactivé !");

        if (this.state.classe !== 'NA') {
          this.removeUserFromList(login);
        }
      })
      .catch(err => {
        console.error('Request failed', err);
        this.openSnackbar("error", "Une erreur est survenue dans la modification !");
      });
  };

  handleDeleteMany = (users) => {

    // Importe les utilisateurs
    this.utilisateursAPI.deleteUsers(users)
      .then(usersModified => {
        // Parcours de la liste des utilisateurs supprimés
        let usersList = this.state.users;
        usersModified.forEach( (user) => {
          // On supprime l'utilisateur si il est présent
          usersList = usersList.filter(u => u.login !== user.login);
        });
        this.setState( { users : usersList});

        this.openSnackbar("success", "Suppression des utilisateurs !");

      })
      .catch(err => {
        console.log("Error import");
        this.openSnackbar("error", "Une erreur est survenue dans l'activation !");
      });

  };

  _updateActiveUserList(usersModified) {
    // Parcours de la liste
    let usersList = this.state.users;
    usersList.forEach( (user) => {
      // Recherche
      let userFind = usersModified.find(u => u.login === user.login);
      if (userFind) {
        // Etat activé/désactivé de l'utilisateur
        user.active = userFind.active;
      }
    });
    this.setState( { users : usersList});
  }

  handleActivateMany = (users) => {

    // Importe les utilisateurs
    this.utilisateursAPI.activateUsers(users)
      .then(userModifed => {
        this._updateActiveUserList(userModifed);

        this.openSnackbar("success", "Activation des utilisateurs !");

      })
      .catch(err => {
        console.log("Error import");
        this.openSnackbar("error", "Une erreur est survenue dans l'activation !");
      });
  };

  handleDeactivateMany = (users) => {


    // Importe les utilisateurs
    this.utilisateursAPI.deactivateUsers(users)
      .then(userModifed => {
        this._updateActiveUserList(userModifed);
        this.openSnackbar("success", "Activation des utilisateurs !");
      })
      .catch(err => {
        console.log("Error import");
        this.openSnackbar("error", "Une erreur est survenue dans la désactivation !");
      });
  };



  render() {
    return (
      <div className="main">
        <UtilisateursFilterBar
          classe={this.state.classe}
          nomUser={this.state.nomUser}
          bts={this.state.bts}
          onChange={this.handleChangeValue}
        />


        <Button component={RouterLink} to="/ldap/new" variant="contained"  color="primary">
          <AddIcon />&nbsp;
          Nouvel utilisateur
        </Button>

        <UtilisateursTable
          users={this.state.users}
          nomUser={this.state.nomUser}
          bts={this.state.bts}
          onChangePassword={this.handleChangePassword}
          onDelete={this.handleDelete}
          onDeleteMany={this.handleDeleteMany}
          onActivate={this.handleActivate}
          onDeactivate={this.handleDeactivate}
          onActivateMany={this.handleActivateMany}
          onDeactivateMany={this.handleDeactivateMany}
        />

        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={this.state.openSnackBar}
          autoHideDuration={4000}
          onClose={this.handleCloseSnackBar}
        >
          <SnackbarContentWrapper
            onClose={this.handleCloseSnackBar}
            variant={this.state.snackbarIcon}
            message={this.state.snackbarMessage}
          />
        </Snackbar>
      </div>
    );
  }
}

export default UtilisateursUI;
