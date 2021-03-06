import BaseAPI from "./BaseAPI";

export default class UtilisateursAPI extends BaseAPI {

  constructor() {
    super('https://users.ws.montpellier.epsi.fr/api/users');
  }

  /*
   * Gestion des utilisateurs
   *
   */
  getUsers() {
    return super.apiGetAll();
  }
  getUsersClasse(classe) {
    return super.apiGetAllWithOption('classe/' + classe);
  }

  getUser(login) {
    return super.apiGet(login);
  }

  importUsers(list) {
    return super.apiPostWithURL("imports/", list);
  }

  changeUsersBts(list, bts, btsParcours) {
    return super.apiPut('changebts',
      {
        'logins': list,
        'bts': bts,
        'btsparcours': btsParcours
      });
  }

  addUser(user) {
    return super.apiPost(user);
  }

  updateUser(user) {
    return super.apiPut(user.login, user);
  }

  deleteUser(login) {
    return super.apiDelete(login);
  }

  deleteUsers(list) {
    return super.apiDeleteWithURL('list', list);
  }

  changePassword(login, password) {
    return super.apiPut('password/' + login, {'login': login, 'motDePasse': password});
  }

  activateUser(login) {
    return super.apiPut('activate/' + login, null);
  }

  activateUsers(list) {
    return super.apiPut('activatelist', list);
  }

  deactivateUsers(list) {
    return super.apiPut('deactivatelist', list);
  }

  deactivateUser(login) {
    return super.apiPut('deactivate/' + login, null);
  }

  setAllUsersToNA() {
    return super.apiPut('setuserstona', null);
  }

}