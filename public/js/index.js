const socket = io();

socket.on('connect', function () {
  console.log('connected to server');
});

socket.on('newMessage', function (message) {
  const formattedTime = moment(message.createdAt).format('h:mm:ss a');
  // console.log('new message: ', message);
  // const p = jQuery('<p></p>');
  // p.text(`${message.from} ${formattedTime}: ${message.text}`);
  //
  // jQuery('#messages').append(p);
  const template = jQuery('#message-template').html();
  const html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function(message) {
  const formattedTime = moment(message.createdAt).format('h:mm:ss a');
  const template = jQuery('#location-message-template').html();
  const html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'Doug',
    text: jQuery('[name = message]').val()
  }, function () {
    e.target.elements.message.value = '';
  });
});

const locationButton = jQuery('#send-location');
locationButton.on('click', function() {
  if (!navigator.geolocation) return alert('Geolocation not supported by your browser.');

  locationButton.attr('disabled', 'disabled');

  navigator.geolocation.getCurrentPosition(function (position) {
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      locationButton.removeAttr('disabled');
  }, function () {
    alert('unable to fetch location.')
    locationButton.removeAttr('disabled');
  });
});
