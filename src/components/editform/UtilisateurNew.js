import UtilisateurModify from './UtilisateurModify'

import withStyles from "@material-ui/core/styles/withStyles";
import UtilisateursAPI from "../../services/UtilisateursAPI";
import {withRouter} from "react-router-dom";

// https://scotch.io/courses/using-react-router-4/route-params
// https://lorenstewart.me/2016/10/31/react-js-forms-controlled-components/


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  divMain: {
    margin: 20,
  },
  form: {
    width: "80%",
  },
  button: {
    margin: theme.spacing.unit,
  },
});


class UtilisateurNew extends UtilisateurModify {

  constructor(props) {
    super(props);

    this.createNewUser = true;
    this.title = "Ajout d'un utilisateur";
    this.validateForm = this.validateForm.bind(this);
  }

  validateForm(event) {
    event.preventDefault();

    this.utilisateursAPI.addUser(this.state.user)
      .then(data => {
        //this.openSnackbar("success", "Utilisateur modifié !");

        this.props.history.push("/ldap");
      })
      .catch(err => {
        console.error('Request failed', err);

        this.openSnackbar("error", "Une erreur est survenue dans la modification !");
      });
  }
}

export default  withRouter(withStyles(styles) (UtilisateurNew));