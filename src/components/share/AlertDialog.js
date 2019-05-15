import React from "react";
import PropTypes from "prop-types";

import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import ButtonStyled from "./ButtonStyled";


class AlertDialog extends React.Component {

  handleAction = () => {
    this.props.onActionValidate();
  };

  handleClose = () => {
    this.props.onClose();
  };


  render() {

    const {variant, isDialogOpened, actionButtonLabel, contentText, titleText} = this.props;

    return (
      <Dialog
        open={isDialogOpened}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{titleText}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {contentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="default" autoFocus>
            Annuler
          </Button>


          <ButtonStyled
            text={actionButtonLabel}
            variant={variant}
            onClick={this.handleAction}
          />

        </DialogActions>
      </Dialog>
    );
  }

}

AlertDialog.propTypes = {
  isDialogOpened: PropTypes.bool.isRequired,
  titleText: PropTypes.string.isRequired,
  contentText: PropTypes.string.isRequired,
  actionButtonLabel: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

export default AlertDialog;