import UtilisateurModify from './UtilisateurModify'

import withStyles from "@material-ui/core/styles/withStyles";
import UtilisateursAPI from "../../api/UtilisateursAPI";

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


class UtilisateurEdit extends UtilisateurModify {

    constructor(props) {
        super(props);

        this.createNewUser = false;
        this.title = "Modification de l'utilisateur";
        this.validateForm = this.validateForm.bind(this);
    }


    componentDidMount() {
        const {match: {params}} = this.props;

        this.utilisateursAPI.getUser(params.login)
            .then(data => {
                this.setState({user: data});
                this.setState({processRunning: false});

                console.log(data);
            })
          .catch(err => {
            this.openSnackbar("error", "Erreur : " + err.message);

            this.setState({processRunning: false});
          })
    }

    validateForm(event) {
        event.preventDefault();

        this.utilisateursAPI.updateUser(this.state.user)
            .then(data => {
              this.openSnackbar("success", "Utilisateur modifié !");
            })
            .catch(err => {
                console.error('Request failed', err);

              this.openSnackbar("error", "Une erreur est survenue dans la modification !");
            });
    }
}

export default  withStyles(styles) (UtilisateurEdit);