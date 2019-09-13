import React, { Component } from 'react'

import {Link as RouterLink, withRouter} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline/index";
import Typography from "@material-ui/core/Typography/index";
import Paper from "@material-ui/core/Paper/index";
import Table from "@material-ui/core/Table/index";
import TableHead from "@material-ui/core/TableHead/index";
import TableRow from "@material-ui/core/TableRow/index";
import TableCell from "@material-ui/core/TableCell/index";
import TableBody from "@material-ui/core/TableBody/index";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid/index";
import TextField from "@material-ui/core/TextField/index";
import Button from "@material-ui/core/Button/index";
import DoneButton from "@material-ui/icons/CheckCircle"
import PwdCheckButton from "@material-ui/icons/Spellcheck"
import ErrorButton from "@material-ui/icons/ErrorOutline"


import UtilisateursAPI from "../../services/UtilisateursAPI";
import Menu from "../Menu";
import Topbar from "../Topbar";
import {UserImport} from "./UserImport";
import ClasseSelect from "../share/ClasseSelect";
import SnackbarContentWrapper from  "../share/SnackbarContentWrapper";
import Snackbar from "@material-ui/core/Snackbar";
import ButtonStyled from "../share/ButtonStyled";
import AlertDialog from "../share/AlertDialog";



const styles = theme => ({
    divMain: {
        margin: 20,
    },
    button: {
        margin: 'auto',
    },
    input: {
        display: 'none',
    },
    inputfile : {
        display: 'none'
    },
    csvFile: {
        marginLeft: '10px',
        marginRight: '20px',

    },
    container: {
        marginLeft: '10px',
        display: 'flex',
        flexWrap: 'wrap',
    },
});


class UtilisateursImport extends Component {

    constructor(props) {
        super(props);


        // Liste des utilisateurs du CSV
        this.state = {
            // Liste des utilisateurs
            users: [],
            // Classe de l'import
            classeImport : '',
            // Nom du fichier
            csvFileName : '',
            // l'import est en cours
            importRunning: false,
            // snackbar
            openSnackBar: false,
            snackbarIcon: "success",
            snackbarMessage: "Importation effectuée !",
            openUsersNADialog: false,
        };

        // Fichier CSV
        this.fileReader = null;
        // API Users
        this.utilisateursAPI = new UtilisateursAPI();

        this.handleFileChosen = this.handleFileChosen.bind(this);
        this.handleFileRead = this.handleFileRead.bind(this);
    }

    handleFileRead() {
        const content = this.fileReader.result;

        // la liste à construire
        let listUsers = [];
        let lines = content.split('\n');
        let headers = [];
        let cpt = 0;
        lines.forEach(function(line){

            if (line !== '') {
                // On ne lit pas la première ligne (en-tête) mais on la conserve
                if (cpt === 0) {
                    cpt++;
                    // Lecture de l'en-tête
                    headers = line.split(',');
                    UserImport.setHeadersFromCSV(headers)
                } else {
                    listUsers.push(UserImport.createUserImportFromCSV(line));
                }
            }
        });

        this.setState( { users: listUsers });
    }

    handleFileChosen(filename) {
        if (filename === null || filename === undefined) {
            this.setState( { csvFileName : ''});
            this.setState( { users : []});
        } else {
            this.setState( { csvFileName : filename.name});

            this.fileReader = new FileReader();
            this.fileReader.onloadend = this.handleFileRead;
            this.fileReader.readAsText(filename);
        }
    }

    handleChangeClasse = value => {
        this.setState({
            classeImport: value
          }
        )
    };

    doImport() {
        const classe = this.state.classeImport;

        // L'import est démarré
        this.setState( { importRunning: true});

        let users = this.state.users;

        // Fixe la classe
        users.forEach( (user) => {
            user.classe = classe;
            console.log(user);
        });
        // Importe les utilisateurs
        this.utilisateursAPI.importUsers(users)
          .then(usersImported => {
              console.log('Importé: ');
              console.log(usersImported);

              // Parcours de la liste
              let usersList = this.state.users;
              usersList.forEach( (user) => {
                  // Recherche
                  let userFind = usersImported.find(u => u.login === user.login);
                  if (userFind) {
                      //
                      user.status = userFind.status;
                  }
              });
              this.setState( { users : usersList});
              // L'import est fini
              this.setState( { importRunning: false});
          })
          .catch(err => {
              console.log("Error import");
              this.setState({ snackbarIcon: "error" });
              this.setState({ snackbarMessage: "Erreur : " + err.message });
              this.setState({ openSnackBar: true });
              // L'import est fini
              this.setState( { importRunning: false});
          });
    }

    handleCloseUsersNADialog = () => {
        this.setState({ openUsersNADialog: false });
    };

    handleUsersNAConfirm = () => {
        this.setState({ openUsersNADialog: false });
        // Bascule les utilisateurs en classe NA
        this.utilisateursAPI.setAllUsersToNA()
          .then(() => {
            alert("Tous les utilisateurs sont en classe 'NA'.")
          })
          .catch(err => {
              console.log("Error import");
              this.setState({ snackbarIcon: "error" });
              this.setState({ snackbarMessage: "Erreur : " + err.message });
              this.setState({ openSnackBar: true });
          });
    };

    handleOpenUsersToNA() {
        this.setState({ openUsersNADialog: true });
    }


    render() {
        const menu = Menu.find(m => m.pathname === this.props.location.pathname);
        const { csvFileName, users, classeImport, importRunning} = this.state;
        const { classes } = this.props;
        const classeDisable = csvFileName === '';
        const disableImportButton = importRunning || classeDisable || classeImport === '';

        const rows = [];
        let divStatus = <TableCell>&nbsp;</TableCell>;

        users.forEach( (user) => {

            switch (user.status )
            {
                case -2:
                case -1:
                    divStatus = <TableCell><ErrorButton color={"error"}/></TableCell>;
                    break;
                case 0:
                    divStatus = <TableCell><Typography variant="body2" gutterBottom color={"primary"}>En attente</Typography></TableCell>;
                    break;
                case 1:
                case 2:
                    divStatus = <TableCell><DoneButton color={"primary"} /></TableCell>;
                    break;
                default:
                    break;
            }
            let divPaswordValid;
            if (user.isPasswordValid) {
                divPaswordValid = <PwdCheckButton color={"action"}/>;
            } else {
                divPaswordValid = <ErrorButton color={"error"}/>;
            }


            rows.push(
              <TableRow key={user.login}>
                  {divStatus }
                  <TableCell>{user.nom}</TableCell>
                  <TableCell>{user.prenom}</TableCell>
                  <TableCell>{user.mail}</TableCell>
                  <TableCell>{user.login}</TableCell>
                  <TableCell>{divPaswordValid}</TableCell>
              </TableRow>
            );
        });

        return (
            <React.Fragment>
                <CssBaseline/>
                <Topbar menuIndex={menu==null ? -1 : menu.menuIndex} />
                <div className={classes.divMain}>
                    <Typography variant="h4" gutterBottom>
                        Importation des utilisateurs
                    </Typography>
                    <Button component={RouterLink} to="/ldap" color="primary">Retour à la liste</Button>

                    <br />
                    <br />
                    <ButtonStyled
                      text="Basculer tous les utilisateurs en classe 'NA'"
                      variant={"warning"}
                      onClick={ () => this.handleOpenUsersToNA() }
                    />
                    <br />
                    <br />

                    <Grid container>
                        <Grid item xs={12} sm={12} md={1}>
                            <input type='file'
                                   id='fileupload'
                                   className={classes.inputfile}
                                   accept='.csv'
                                   onChange={e => this.handleFileChosen(e.target.files[0])}
                            />
                            <label htmlFor="fileupload">
                                <Button
                                  variant="contained"
                                  component="span"
                                  className={classes.button}
                                >
                                    Upload
                                </Button>
                            </label>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3}>
                            <TextField
                              id="csvfile"
                              label="Fichier CSV"
                              fullWidth
                              className={classes.csvFile}
                              disabled={true}
                              value={csvFileName}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={2}>
                            <ClasseSelect
                              disabled={classeDisable}
                              classeSelected = {this.state.classeImport}
                              classes = {classes}
                              onChange={this.handleChangeClasse}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} >
                            <Grid container justify="flex-end">
                                <Grid item >
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      className={classes.button}
                                      disabled={disableImportButton}
                                      onClick={ () => this.doImport() }
                                    >
                                        Importer
                                    </Button>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>

                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell width={'160px'}>Status</TableCell>
                                    <TableCell>Nom</TableCell>
                                    <TableCell>Prénom</TableCell>
                                    <TableCell>Mail</TableCell>
                                    <TableCell>Identifiant</TableCell>
                                    <TableCell>Mot de passe</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>{rows}</TableBody>
                        </Table>
                    </Paper>


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

                    <AlertDialog
                      isDialogOpened={this.state.openUsersNADialog}
                      variant="warning"
                      titleText="Classe 'NA'"
                      contentText="Basculer tous les utilisateurs dans la classe 'NA' désactivera certains services (ex: Suivi PPE). Etês-vous sûr ?"
                      actionButtonLabel='Confirmer'

                      onClose={this.handleCloseUsersNADialog}
                      onActionValidate={this.handleUsersNAConfirm}
                    />
                </div>

            </React.Fragment>

        )
    };

}

export default  withRouter(withStyles(styles) (UtilisateursImport));