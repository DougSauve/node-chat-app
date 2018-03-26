const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: 1,
      name: 'Doug',
      room: 'People'
    }, {
      id: 2,
      name: 'Ariana',
      room: 'People'
    }, {
      id: 3,
      name: 'Ginger',
      room: 'Pets'
    }]
  });

  it('should add a new user', () => {
    const user = {
      id: '123',
      name: 'Doug',
      room: 'Home'
    };

    users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual(expect.arrayContaining([user]));
  });

  it('should remove a user', () => {
    const userID = 3;

    const removedUser = users.removeUser(userID);

    expect(removedUser.id).toEqual(userID);
    expect(users.users.length).toBe(2);

  });
  it('should not remove a user when given an invalid id', () => {
    const removedUser = users.removeUser(6);
    expect(removedUser).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it('should return a user by id', () => {
    const user = users.getUser(1);
    expect(user).toEqual(users.users[0]);
  });

  it('should not return a user from an invalid', () => {
    const user = users.getUser(6);
    expect(user).toBeFalsy();
  });

  it('should return a list of users in the room', () => {
    const userList = users.getUserList("People");

    expect(userList).toEqual(['Doug', 'Ariana']);
  });
});
