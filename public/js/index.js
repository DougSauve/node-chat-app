const socket = io();

socket.on('connect', function () {
  console.log('connected to server');

});
socket.on('welcome', function(message) {
  console.log(message);
});

socket.on('newMessage', function (email) {
  console.log('new message: ', email);
});
