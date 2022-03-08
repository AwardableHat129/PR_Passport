const {getJSON, saveJSON} = require('../utils/fileHelpers');

class User {
  constructor() {
    this.saveData = saveJSON;
    this.fetchData = getJSON;
  }

  async find(id) {

    // fetch the users
    const users = getJSON();

    return new Promise((resolve, reject) => {

      // Find the users
      const user = users.find((listUser) => listUser.id = id);

      if (user)
        resolve(user)
      else
        reject(new Error(`User with id ${ id } not found.`));
    });   

  }

  async create(user) {
    // fetch the users
    const users = getJSON();

    // append the user to all the users
    users.push(user);

    // save the users
    saveJSON(users);

    // return the saved user
    return user;
  }
};

module.exports = new User();