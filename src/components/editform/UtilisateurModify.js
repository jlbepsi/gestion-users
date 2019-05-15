import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import CssBaseline from '@material-ui/core/CssBaseline/index';
import Grid from "@material-ui/core/Grid/index";
import FormControl from "@material-ui/core/FormControl/index";
import InputLabel from "@material-ui/core/InputLabel/index";
import Select from "@material-ui/core/Select/index";
import MenuItem from "@material-ui/core/MenuItem/index";
import TextField from "@material-ui/core/TextField/index";
import FormControlLabel from "@material-ui/core/FormControlLabel/index";
import Switch from "@material-ui/core/Switch/index";
import Typography from "@material-ui/core/Typography/index";
import CircularProgress from "@material-ui/core/CircularProgress/index";
import Button from "@material-ui/core/Button/index";
import Snackbar from "@material-ui/core/Snackbar";

import Menu from "../Menu";
import Topbar from "../Topbar";
import UtilisateursAPI from "../../api/UtilisateursAPI";
import ClasseSelect from "../share/ClasseSelect";
import SnackbarContentWrapper from  "../share/SnackbarContentWrapper";



class UtilisateurModify extends Component {

    createNewUser = false;
    title = "";
    state = {
        user: {
            userDN: "",
            active: "",
            login: "",
            nomComplet :null,
            nom: "",
            prenom: "",
            motDePasse: null,
            classe: "",
            mail: "",
            role :"ROLE_USER",
            bts: false,
            btsParcours: "",
            btsNumero: ""
        },
        openSnackBar: false,
        snackbarIcon: "success",
        snackbarMessage: "Modifications effectuées !",
        processRunning: true,
    };
    // API Users
    utilisateursAPI = new UtilisateursAPI();


    handleChangeNomPrenom = name => event => {
        const {value} = event.target;
        let user = {...this.state.user, [name]: value};

        if (this.createNewUser) {
            user.login = (user.prenom === '' ? '' : user.prenom.toLowerCase()) + "." + (user.nom === '' ? '' : user.nom.toLowerCase());
            user.mail = user.login + "@epsi.fr";
        }

        this.setState({user});

    };

    handleChange = name => event => {
        const {value} = event.target;
        let user = {...this.state.user, [name]: value};
        this.setState({user});
    };

    handleSwitchChange = name => event => {
        const {checked} = event.target;
        let user = {...this.state.user, [name]: checked};
        this.setState({user});
    };

    handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnackBar: false });
    };

    openSnackbar(icon, message) {
        this.setState({ snackbarIcon: icon });
        this.setState({ snackbarMessage: message });
        this.setState({ openSnackBar: true });
    };

    render() {
        const { classes } = this.props;
        const menu = Menu.find(m => m.pathname === this.props.location.pathname);

        let title;
        if (this.createNewUser) {
            title = <Typography variant="h4" gutterBottom>
                {this.title}
            </Typography>

        } else {
            if (this.state.processRunning) {
                title = <div><CircularProgress size={30} thickness={5}/>Chargement en cours ...</div>
            } else {
                /*if (this.state.user.nomComplet == null) {
                    title = <Typography variant="h4" gutterBottom>
                        {this.title} {this.state.user.nomComplet}
                    </Typography>
                } else {*/
                    title = <Typography variant="h4" gutterBottom>
                        {this.title} {this.state.user.nomComplet}
                    </Typography>
                /*}*/
            }
        }

        const userToModify = this.state.user;
        const editingUser = this.createNewUser === false;

        let login, mail, pwd, pwdConfirm;
        if (editingUser) {
            login =
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  id="login"
                  label="Login"
                  disabled={true}
                  fullWidth

                  value={userToModify.login}
                  onChange={this.handleChange('login')}
                />
            </Grid>;

            mail =
              <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    id="mail"
                    label="Mail"
                    disabled={true}
                    fullWidth

                    value={userToModify.mail}
                    onChange={this.handleChange('mail')}
                  />
              </Grid>;

            pwd =null;

            pwdConfirm =null;
        } else {

            login =
              <Grid item xs={12} sm={12} md={4}>
                  <TextField
                    id="login"
                    label="Login"
                    fullWidth

                    value={userToModify.login}
                    required
                    onChange={this.handleChange('login')}
                  />
              </Grid>;

            mail =
              <Grid item xs={12} sm={12} md={4}>
                  <TextField
                    id="mail"
                    label="Mail"
                    fullWidth

                    value={userToModify.mail}
                    required
                    onChange={this.handleChange('mail')}
                  />
              </Grid>;

            pwd =
              <Grid item xs={12} sm={12} md={2}>
                  <TextField
                    id="password"
                    label="Mot de passe"
                    type="password"
                    fullWidth

                    required
                    onChange={this.handleChange('motDePasse')}
                  />
              </Grid>;

            pwdConfirm =
              <Grid item xs={12} sm={12} md={2}>
                  <TextField
                    id="passwordConfirm"
                    label="Confirmation"
                    type="password"
                    fullWidth

                    required
                    onChange={this.handleChange('motDePasseConfirm')}
                  />
              </Grid>;
        }


        return (
          <React.Fragment>
            <CssBaseline/>
            <Topbar menuIndex={menu==null ? -1 : menu.menuIndex} />
              <div className={classes.divMain}>
                  {title}

                  <Button component={RouterLink} to="/ldap" color="primary">Retour à la liste</Button>

                  <br />
                  <br />
                  <form className={classes.form} autoComplete="off" onSubmit={this.validateForm}>
                      <Grid container spacing={8}>
                          <Grid item xs={12} sm={12} md={4}>
                              <ClasseSelect
                                classeSelected = {userToModify.classe}
                                classes = {classes}

                                required
                                onChange={this.handleChange}
                              />
                          </Grid>
                          <Grid item xs={12} sm={12} md={4}>
                              <TextField
                                id="nom"
                                label="Nom"
                                fullWidth

                                value={userToModify.nom}
                                required
                                onChange={this.handleChangeNomPrenom('nom')}
                              />
                          </Grid>
                          <Grid item xs={12} sm={12} md={4}>
                              <TextField
                                id="prenom"
                                label="Prénom"
                                fullWidth

                                value={userToModify.prenom}
                                required
                                onChange={this.handleChangeNomPrenom('prenom')}
                              />
                          </Grid>


                          {login}

                          {mail}

                          {pwd}

                          {pwdConfirm}

                          <Grid item xs={12} sm={12} md={2}>
                              <FormControlLabel
                                control={
                                    <Switch
                                      checked={userToModify.bts}
                                      onChange={this.handleSwitchChange('bts')}
                                      color="default"
                                      value="bts"
                                    />
                                }
                                label="BTS"
                              />

                          </Grid>
                          <Grid item xs={12} sm={12} md={5}>
                              <FormControl fullWidth>
                                  <InputLabel htmlFor="btsParcours">Parcours</InputLabel>
                                  <Select
                                    disabled={! userToModify.bts}
                                    value={userToModify.btsParcours}
                                    onChange={this.handleChange('btsParcours')}
                                  >
                                      <MenuItem value={'IND'}>Indifferencié</MenuItem>
                                      <MenuItem value={'SLAM'}>SLAM</MenuItem>
                                      <MenuItem value={'SISR'}>SISR</MenuItem>
                                  </Select>
                              </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={12} md={5}>
                              <TextField
                                disabled={! userToModify.bts}
                                id="btsNumero"
                                label="Numéro BTS"
                                fullWidth

                                value={userToModify.btsNumero}
                                onChange={this.handleChange('btsNumero')}
                              />
                          </Grid>

                          <Grid item xs={12} sm={12} md={12} className={classes.actionbutton}>
                              <Button component={RouterLink} to="/ldap">Annuler</Button>
                              &nbsp;
                              <Button
                                  variant="contained"
                                  color="primary"
                                  type={'submit'}
                              >
                                  Valider
                              </Button>
                          </Grid>

                      </Grid>
                  </form>

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
          </React.Fragment>

        )
    };
}

//export default  withStyles(styles) (UtilisateurModify);
export default  UtilisateurModify;