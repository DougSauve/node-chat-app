const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const port = process.env.PORT || 4200;
const publicPath = path.join(__dirname + '/../public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server); //this is my web sockets server.

const {generateMessage} = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New User Connected');

  socket.emit('welcome', {
    from: "Admin",
    text: "Welcome to the chat app!",
    createdAt: new Date().getTime()
  });
  socket.broadcast.emit('welcome', generateMessage('Admin', 'New user joined the chat.'));

  socket.on('createMessage', function(message) {
    console.log('createMessage: ', message);
    io.emit('newMessage', generateMessage('Admin', 'New user joined the chat.'));
  });

  socket.on('disconnect', () => {
    console.log('User disconnected.');
  });
})

server.listen(port, () => console.log(`app is up on port ${port}.`));
