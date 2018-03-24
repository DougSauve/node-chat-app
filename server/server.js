const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const port = process.env.PORT || 4200;
const publicPath = path.join(__dirname + '/../public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server); //this is my web sockets server.

const {generateMessage, generateLocationMessage} = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New User Connected');

  socket.emit('newMessage',  generateMessage('Admin', 'Welcome to the chat app!'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined the chat.'));

  socket.on('createMessage', function (message, gotIt) {
    console.log('message passing through: ', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    gotIt();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('User disconnected.');
  });
})

server.listen(port, () => console.log(`app is up on port ${port}.`));
