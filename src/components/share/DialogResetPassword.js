import React, {useEffect}  from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import Dialog from "@material-ui/core/Dialog/index";
import DialogTitle from "@material-ui/core/DialogTitle/index";
import DialogContent from "@material-ui/core/DialogContent/index";
import DialogContentText from "@material-ui/core/DialogContentText/index";
import TextField from "@material-ui/core/TextField/index";
import DialogActions from "@material-ui/core/DialogActions/index";
import Button from "@material-ui/core/Button/index";
import Grid from "@material-ui/core/Grid";
import ButtonStyled from "./ButtonStyled";



const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
  errorMessages: {
    height: 50,
    marginTop: theme.spacing.unit *2,
    color: '#ED4740',
    backgroundColor: '#fff0f5'
  },
  noErrors: {
    height: 74,
  },
});

function DialogResetPassword(props) {

  const PASSWORD_EMPTY = 1 << 3;
  const PASSWORD_LENGTH_INF = 1 << 4;
  const PASSWORDCONFIRM_EMPTY = 1 << 5;
  const PASSWORD_NOT_EQUAL_PASSWORDCONFIRM_EMPTY = 1 << 6;

  const [errors, setErrors] = React.useState([]);
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');
  const [btnAddDisabled, setBtnAddDisabled] = React.useState(
    PASSWORD_EMPTY | PASSWORD_LENGTH_INF |
    PASSWORD_NOT_EQUAL_PASSWORDCONFIRM_EMPTY
  );

  useEffect( () => {
      console.log('DialogResetPassword - props.useEffect')
      verifyBtnAddDisabled()
    }, [password, passwordConfirm]
  );

  function handleAction () {
    props.onChangePassword(props.userLogin, password);
    // Fermeture
    props.onClose();
  };

  function handleClose () {
    props.onClose();
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
  }
  function handleChangeConfirmPassword(event) {
    setPasswordConfirm(event.target.value);
  }

  function verifyBtnAddDisabled() {

    let errorsList = [];

    let disabled = 0x0;
    if (password.length === 0) {
      disabled |= PASSWORD_EMPTY;
      errorsList.push('Le mot de passe doit être renseigné');
    } else if (password.length < 6) {
      disabled |= PASSWORD_LENGTH_INF;
      errorsList.push('La longueur minimale doit être de 6 caractères');
    }
    if (passwordConfirm.length === 0) {
      disabled |= PASSWORDCONFIRM_EMPTY;
      errorsList.push('La confirmation du mot de passe doit être renseigné');
    } else if (password !== passwordConfirm) {
      disabled |= PASSWORD_NOT_EQUAL_PASSWORDCONFIRM_EMPTY;
      errorsList.push('Les mots de passe doivent être identiques');
    }

    setErrors(errorsList);
    setBtnAddDisabled(disabled);
  }

  function displayErrors() {
    if (errors.length === 0) {
      return (<div className={classes.noErrors} >&nbsp;</div>)
    }

    return (
      <div className={classes.errorMessages} >
        <ul>
          {errors.map( (error, index) => (
            <li key={index}><strong>{error}</strong></li>
          ))}
        </ul>
      </div>
    );
  }

  const { classes, userLogin, ...other } = props;

  return (
    <Dialog
      onClose={handleClose}
      fullWidth={true}
      {...other}
    >
      <DialogTitle id="form-dialog-title">Modification de mot de passe</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Réinitaliser le mot de passe pour l'utilisateur : {userLogin}
        </DialogContentText>

        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              id="password"
              label="Mot de passe"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={handleChangePassword}

              error={ btnAddDisabled & (PASSWORD_EMPTY | PASSWORD_LENGTH_INF | PASSWORD_NOT_EQUAL_PASSWORDCONFIRM_EMPTY) }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              id="passwordConfirm"
              label="Confirmation du mot de passe"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={handleChangeConfirmPassword}

              error={ btnAddDisabled & (PASSWORDCONFIRM_EMPTY | PASSWORD_NOT_EQUAL_PASSWORDCONFIRM_EMPTY) }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {displayErrors()}
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="default" autoFocus>
          Annuler
        </Button>

        <ButtonStyled
          text='Valider'
          variant={"success"}
          disabled={btnAddDisabled !== 0x0}
          onClick={handleAction}
        />
      </DialogActions>
    </Dialog>
  );
}

DialogResetPassword.propTypes = {
  open: PropTypes.bool.isRequired,
  userLogin: PropTypes.string.isRequired,
  onChangePassword: PropTypes.func.isRequired,
};

export default withStyles(styles) (DialogResetPassword);