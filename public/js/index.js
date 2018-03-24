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

socket.on('newLocationMessage', function(message) {
  const p = jQuery('<p></p>');
  const a = jQuery('<a target = "_blank">My Location</a>');

  p.text(`${message.from}: `);
  a.attr('href', message.url);
  p.append(a);

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

const locationButton = jQuery('#send-location');
locationButton.on('click', function() {
  if (!navigator.geolocation) return alert('Geolocation not supported by your browser.');

  navigator.geolocation.getCurrentPosition(function (position) {
      socket.emit('newLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }, function (mapLink) {
        alert(mapLink);
      });
  }, function () {
    alert('unable to fetch location.')
  });
});
