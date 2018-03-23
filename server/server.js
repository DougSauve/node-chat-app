const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const port = process.env.PORT || 4200;
const publicPath = path.join(__dirname + '/../public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server); //this is my web sockets server.

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New User Connected');

  socket.emit('welcome', {
    from: "Admin",
    text: "Welcome to the chat app!",
    createdAt: new Date().getTime()
  });
  socket.broadcast.emit('welcome', {
    from: "Admin",
    text: "New user joined the chat.",
    createdAt: new Date().getTime()
  });
  //socket.emit from admin, welcome
  //socket.broadcast.emit, so-and-so joined.

  socket.on('createMessage', function(message) {
    console.log('createMessage: ', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });


    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text
    // });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected.');
  });
}) //listen for a new connection

server.listen(port, () => console.log(`app is up on port ${port}.`));
