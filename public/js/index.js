const socket = io();

// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'hi'
// }, function (gotIt) {
//   console.log("Got it: ", gotIt);
// });

socket.on('connect', function () {
  console.log('connected to server');
});

socket.on('newMessage', function (message) {
  console.log('new message: ', message);
  const p = jQuery('<p></p>');
  p.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(p);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'Doug',
    text: jQuery('[name = message]').val()
  }, function () {
    e.target.elements.message.value = "";
  });
});
