

import User from "../share/User";


export class UserImport extends User {

  constructor(login, nom, prenom, motDePasse, classe, mail) {
    super (login, nom, prenom, motDePasse, classe, mail, false, "", "", "");

    this.status = -100;
  }

  static map = null;

  static setHeadersFromCSV(headers) {
    UserImport.map = new Map();

    UserImport.map.set("login", headers.findIndex(e => e.toLowerCase() === 'loginperso'));
    UserImport.map.set("nom", headers.findIndex(e => e.toLowerCase() === 'nom'));
    UserImport.map.set("prenom", headers.findIndex(e => e.toLowerCase() === 'prenom'));
    UserImport.map.set("mdp", headers.findIndex(e => e.toLowerCase() === 'motdepasse'));
    UserImport.map.set("mail", headers.findIndex(e => e.toLowerCase() === 'mailetudiant'));
  }

  static createUserImportFromCSV(line) {
    // line: RUFF;Hugo;hugo.ruff;123ABC;hugo.ruff@epsi.fr
    let userInfo = line.split(',');

    return new UserImport(userInfo[UserImport.map.get('login')], userInfo[UserImport.map.get('nom')],
      userInfo[UserImport.map.get('prenom')], userInfo[UserImport.map.get('mdp')], '', userInfo[UserImport.map.get('mail')]);
  }
}
