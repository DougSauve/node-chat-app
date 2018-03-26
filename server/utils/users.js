class Users {
  constructor () {
    this.users = [];
  }

  addUser (id, name, room) {
    const user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser (id) {
    let removedUser = this.getUser(id);

    if (removedUser) {
      this.users = this.users.filter((user) => user.id !== id);
    }

    return removedUser;
  }

  getUser (id) {
    const user = this.users.filter((user) => {
    return user.id === id;
  })[0];
    return user;
  }

  getUserList (room) {
    const users = this.users.filter((user) => {
      return user.room === room;
    });

    //let usersByName = [];
    //users.forEach((user) => usersByName.push(user.name));  **or**
    let usersByName = users.map((user) => user.name);

    return usersByName;
  }
};

module.exports = {
  Users
}
