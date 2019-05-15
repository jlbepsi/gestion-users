

export default class User {

  constructor(login, nom, prenom, motDePasse, classe, mail, bts, btsParcours, btsNumero) {
    this.login = login;
    this.nom = nom;
    this.prenom = prenom;
    this.motDePasse = motDePasse;
    this.classe = classe;
    this.mail = mail;
    this.role = "ROLE_USER";
    this.bts = bts;
    this.btsParcours = btsParcours;
    this.btsNumero = btsNumero;
  }

  get isPasswordValid() {
    const regex = new RegExp('\^[0-9]{3}[A-Z]{3}$');
    return regex.test(this.motDePasse);
  }
}