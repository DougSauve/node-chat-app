const socket = io();

socket.on('connect', function () {
  console.log('connected to server');

  // socket.emit('createEmail', {
  //   to: 'doug@gmail.com',
  //   text: 'hey man'
  // });
  // socket.emit('createMessage', {
  //   from: "Doug",
  //   text: "Hey dude",
  // });
});
socket.on('welcome', function(message) {
  console.log(message);
});
// socket.on('welcome', function(message) {
//   console.log(message);
// });

socket.on('newMessage', function (email) {
  console.log('new message: ', email);
});
