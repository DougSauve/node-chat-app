const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const port = process.env.PORT || 4200;
const publicPath = path.join(__dirname + '/../public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server); //this is my web sockets server.
const users = new Users();

app.use(express.static(publicPath));


io.on('connection', (socket) => {
  console.log('New User Connected');

  //New user joins
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage',  generateMessage('Admin', `Welcome to ${params.room}!`));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined ${params.room}.`));
    callback();
  });

  //user sends a message
  socket.on('createMessage', function (message, gotIt) {
    console.log('message passing through: ', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    gotIt();
  });

  //user sends location
  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Doug', coords.latitude, coords.longitude));
  });

  //user leaves the room
  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the chat.`));
    }

    console.log('User disconnected.');
  });
})

server.listen(port, () => console.log(`app is up on port ${port}.`));
