import Dialog from "@material-ui/core/Dialog/index";
import DialogTitle from "@material-ui/core/DialogTitle/index";
import DialogContent from "@material-ui/core/DialogContent/index";
import DialogContentText from "@material-ui/core/DialogContentText/index";
import TextField from "@material-ui/core/TextField/index";
import DialogActions from "@material-ui/core/DialogActions/index";
import Button from "@material-ui/core/Button/index";
import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";



const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
});

class ResetPasswordDialog extends React.Component {

  userPassword = '';
  userConfirmPassword = '';
  state = {
    passwordErrorText : 'Le mot de passe doit être renseigné',
    confirmPasswordErrorText: 'La confirmation du mot de passe doit être renseigné'
  };

  handleChangePassword = () => {
    this.props.onChangePassword(this.props.userLogin, this.userPassword);
    // Fermeture
    this.props.onClose();
  };

  handleClose = () => {
    this.props.onClose();
  };

  handleChangePasswordText = event => {
    this.userPassword = event.target.value;

    this.verifyErrors();
  };

  handleChangeConfirmPasswordText = event => {
    this.userConfirmPassword = event.target.value;

    this.verifyErrors();
  };

  verifyErrors() {

    let text = ' ';
    if (this.userPassword.length === 0) {
      text = 'Le mot de passe doit être renseigné';
    } else if (this.userPassword.length < 6) {
      text = 'La longueur doit être supérieure ou égale à 6';
    } else if (this.userPassword !== this.userConfirmPassword) {
      text = "Les mots de passe ne correspondent pas";
    }
    this.setState({passwordErrorText: text});

    if (this.userConfirmPassword.length === 0) {
      text = 'La confirmation du mot de passe doit être renseigné';
    } else if (this.userConfirmPassword.length < 6) {
      text = 'La longueur doit être supérieure ou égale à 6';
    } else if (this.userPassword !== this.userConfirmPassword) {
      text = "Les mots de passe ne correspondent pas";
    }
    this.setState({confirmPasswordErrorText: text});
  }

  render() {

    const openDialogPwd = this.props.isDialogPasswordOpened;
    const {passwordErrorText, confirmPasswordErrorText} = this.state;
    const {classes, userLogin} = this.props;

    return (
      <Dialog
        open={openDialogPwd}
        onClose={this.handleCloseDialogPwd}
        aria-labelledby="form-dialog-title"
        maxWidth={"xs"}
      >
        <DialogTitle id="form-dialog-title">Modification de mot de passe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Réinitaliser le mot de passe pour l'utilisateur : {userLogin}
          </DialogContentText>

          <form>
          <TextField
            className={classes.textField}
            error={passwordErrorText.length > 1}
            autoFocus
            margin="dense"
            id="password"
            label="Mot de passe"
            type="password"
            helperText={passwordErrorText}
            onChange={this.handleChangePasswordText}
          />

          <TextField
            className={classes.textField}
            error={confirmPasswordErrorText.length > 1}
            margin="dense"
            id="passwordConfirm"
            label="Confirmer le mot de passe"
            type="password"
            helperText={confirmPasswordErrorText}
            onChange={this.handleChangeConfirmPasswordText}
          />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="default">
            Annuler
          </Button>
          <Button
            onClick={this.handleChangePassword}
            color="primary"
            disabled={passwordErrorText.length > 1 || confirmPasswordErrorText.length > 1}
          >
            Valider
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ResetPasswordDialog.propTypes = {
  isDialogPasswordOpened: PropTypes.bool.isRequired,
  userLogin: PropTypes.string.isRequired,
};

export default withStyles(styles) (ResetPasswordDialog);