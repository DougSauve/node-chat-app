const socket = io();

function scrollToBottom () {
  //selectors
  const messages = jQuery('#messages');
  const newMessage = messages.children('li:last-child');

  //heights
  const clientHeight = messages.prop('clientHeight'); //prop is cross-browser :)
  const scrollTop = messages.prop('scrollTop');
  const scrollHeight = messages.prop('scrollHeight');
  const newMessageHeight = newMessage.innerHeight();
  const lastMessageHeight = newMessage.prev().innerHeight();
  //
  // const heights = {
  //   clientHeight,
  //   scrollTop,
  //   newMessageHeight,
  //   lastMessageHeight,
  //   scrollHeight
  // };
  //
  // console.log("Heights:", heights);

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  };

};

//user connects
socket.on('connect', function () {
  console.log('connected to server');
  //join a room
  const params = jQuery.deparam(window.location.search);
  socket.emit('join', params, function(err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    }else{
      console.log('no error');
    }
  });
});

//user receives a message
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

  scrollToBottom();
});

//user receives a location message
socket.on('newLocationMessage', function(message) {
  const formattedTime = moment(message.createdAt).format('h:mm:ss a');
  const template = jQuery('#location-message-template').html();
  const html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);

  scrollToBottom();
});

//user submits/sends a new message
jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    text: jQuery('[name = message]').val()
  }, function () {
    //gotIt
    e.target.elements.message.value = '';
  });
});

//user submits/sends a new location message
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

//server updates the user list
socket.on('updateUserList', function(users) {
  const ol = jQuery('<ul></ul>');

  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);
});

//server initiates disconnection
socket.on('disconnect', function () {
  console.log('disconnected from the server.');
});
