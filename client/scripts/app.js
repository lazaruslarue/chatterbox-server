
$(document).ready(function(){

  $('.submit').on('click', function(){
    var userMessage = $('input').val().toString();
    sendMessage(userMessage);
    $('input').val("  ");
  });

  $('.currentRoom').text(currentRoom);
  $('.userFocus').text(userFocus);
  getMessages();

  $('.reset').on('click', function(){
    getMessages();
    userFocus= 'All';
    currentRoom = 'Lobby';
    $('.currentRoom').text(currentRoom);
    $('.userFocus').text(userFocus);
  });


//Clicking on username
  $('.container').on('click','.username',function(){
    userFocus = $(this).text();
    $('.userFocus').text(userFocus);
    $friendUser = $( "div.username:contains("+ userFocus +") ").addClass('friend');
    $friendUser.siblings('.text').addClass('friend');
    // console.log(userFocus);
    // $('.')
  });

//Clicking on Room Name
  $('.container').on('click','.roomname',function(){
    currentRoom = $(this).text();
    $('.currentRoom').text(currentRoom);
    $rooms = $( "div.roomname:contains("+ currentRoom +") ").parent().addClass('keep');
    $('.message').not('.keep').fadeOut();
    console.log($rooms);
  });
});


//GLOBALS

var userName=''; // grab this from the prompt
var userFocus= 'All';
var currentRoom = 'Lobby';
var listOfMessages = [];
var mostRecentUpdate = '';
var characterLimits = {
  'objectId': 24,
  'roomname': 30,
  'text':140,
  'updatedAt': 24,
  'username': 50
};

var messageFields = [
  'username',
  'roomname',
  'text',
  'createdAt',
  'updatedAt',
  'objectId'
];


// HELPER FUNCTIONS
// var defaultCorsHeaders = {
//    These headers will allow Cross-Origin Resource Sharing (CORS).
//  * This CRUCIAL code allows this server to talk to websites that
//  * are on different domains. (Your chat client is running from a url
//  * like file://your/chat/client/index.html, which is considered a
//  * different domain.) 
//   "access-control-allow-origin": "*",
//   "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
//   "access-control-allow-headers": "content-type, accept",
//   "access-control-max-age": 10 // Seconds.
// };

//RETRIEVING MESSAGES

var getMessages = function(){
  console.log('getting messages');
  $.ajax({
    // always use this url
    url: 'http://127.0.0.1:8080/classes/messages',
    type: 'GET',

    contentType: 'application/json',
    // data: {"order" :"-createdAt"},
    // {"where": {
    //       "objectId":"teDOY3Rnpe"
    //       // "order":"-createdAt"
    //     }
    //   },
    success: function (data) {
      listOfMessages = [];
      var objectifiedData = JSON.parse(data);
      _.each(objectifiedData, function(messageJSON){
        console.log(messageJSON);
        renderMessage(messageJSON);
      });
      printMessages(listOfMessages);
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message. Will try again in 2sec');
    }
  });
};


var renderMessage = function(messageJSON){
  var $messageNode = $('<div></div>');
  $messageNode.addClass('message');
  // debugger;
  _.each(messageFields, function(val, i) {
    // debugger;
    var content = messageJSON[messageFields[i]];
    if(content){
      content = content.slice(0,characterLimits[messageFields[i]]);
      if (val.charCodeAt(0) > 150) return;
    }
    $('<div></div>')
      .addClass(messageFields[i])
      .text(content)
      .appendTo($messageNode);
  });
  listOfMessages.push($messageNode);
};

var printMessages = function(listOfMessages){
  $('.message').remove();
  _.each(listOfMessages, function(msgNode, i) {
    if (i % 2) {
      $('#left').append(msgNode);
    } else {
      $('#right').append(msgNode);
    }
  });
};

// SUBMITTING MESSAGES

var composeMessage = function(userText) {
  var sendJSON = {};
  userName = window.location.search;
  userName = userName.split('=')[1];
  sendJSON.username = userName;
  sendJSON.text = userText;
  sendJSON.roomname = currentRoom;
  return sendJSON;
};


var sendMessage = function(input) {
  var msgToSend = composeMessage(input);
  $.ajax({
    url: 'http://127.0.0.1:8080/classes/messages',
    type: 'POST',
    data: JSON.stringify(msgToSend),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
      setTimeout(getMessages,5000);
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
      setTimeout(getMessages,5000);
    }
  });
};

// Object {results: Array[100]}
// results: Array[100]
// 0: Object
// createdAt: "2013-10-07T16:22:03.280Z"
// objectId: "teDOY3Rnpe"
// roomname: "lobby"
// text: "hello"
// updatedAt: "2013-10-07T16:22:03.280Z"
// username: "gary"
// message: message

// var message = {
//   'username': 'shawndrost',
//   'text': 'trololo',
//   'roomname': '4chan'
// };