//loads when we load index.html !!!!!!!!!!!!!!!!!!!!!!!!!
 //better use function keywords because in some cases(safari, mobiles) the arrow functions wont be recognised and the app will crash
            //running js code 
            //we initiate the request. We are making a request from the client to the server to open up a web socket and keep that connection open 
            var socket = io(); //io() is a method  available to us because we loaded the script from the upper page 
            //socket var is what we use to listen for data from the server and to send data to the server
            //communication betweem the client and the server comes in form of event. Events can be emitted from either the client or the server and either the client or the server can listen for events 
            //Events in an email app: the server might emit an event called 'new email' when an new email comes in 
            //the client is going to listen to that event. When it fires it will get the new email data and then will render the email to the screen below to the other ones. 
function scrollToBottom() {
    // Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');//for the last list item
    //Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);//moves to the bottom of the messaging area
    }

}

socket.on('connect', function(){//on method is exactly like the one we used in server.js. We dont get acces to a socket argument because we already have it up above . (connection event over the client)
    // console.log('Connected to server');//as the event fires, the client prints Connected to server 
    //i don't want to emit the event until we are connected 
    // socket.emit('createEmail',{
    //     //in a real application a user would have filled up some forms. Take the text from the forms and send it
    //     to: 'jen@example.com',
    //     text: 'Hey. Let`s pizza' 
    // })
    // socket.emit('createMessage', {
    //     from: 'Vlad',
    //     text: 'Hi'
    // });
    
    var params = jQuery.deparam(window.location.search);//params ia parametrii din querry si face un object cu el
    
    socket.emit('join',params, function(err){
        if(err){
            alert(err);//user will click a
            window.location.href = '/';//we can manipulate wich page the user is on 
        }else{
             console.log('No error');
        }
    })
})
 socket.on('disconnect', function(){
    console.log('Disconnected from server');
})
socket.on('updateUserList', function(users){
   var ol = jQuery('<ol></ol>')
    users.forEach(function (user){
        ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);//randeaza in chat.html la users
});
socket.on('newEmail', function(email){//the data that is emited from your event in server.js is provided as the first argument to your callback function 
    console.log('New email', email);
})

socket.on('newMessage', function(message){
     var formattedTime = moment(message.createdAt).format('h:mm a');
    // var li = jQuery('<li></li>');//creating elements with jquery
    // li.text(`${message.from} ${formattedTime}: ${message.text}`)
    // jQuery('#messages').append(li);
  
    var template = jQuery('#message-template').html();//takes the html template
    console.log(template);
       //this is what we are going to add to the browser 
    var html = Mustache.render(template, {
        text:message.text,
        from:message.from,
        createdAt: formattedTime
    });//offers and html object by using the Mustache templeting 
    console.log(html);
    jQuery('#messages').append(html);
    scrollToBottom();
    
});
// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Hi'
// }, function(data) {
//     console.log('Got it', data);//add an aknoledgment to the client. Data flowed from the server to the client 
// });

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();//prevents page refresh
    var messageTextBox = jQuery('[name=message]');
    socket.emit('createMessage', {
    
        text: messageTextBox.val() //gets the value from the message form 
        
    }, function(){
        messageTextBox.val('');//after you send the message, you want to clear the place where you typed that message 
    });
});//selects the message form 
socket.on('newLocationMessage', function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    // var li = jQuery('<li></li>');//creates a list item 
    // var a = jQuery('<a target="_blank">My current location:</a>')//a represents anchor tag. When you tell _blank, you tell the url to open in a new tab 
    // li.text(`${message.from} ${formattedTime}`);
    // a.attr('href', message.url);//update our anchor tab, sets attr
    // li.append(a);
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template,{
        from:message.from,
        createdAt: formattedTime,
        url: message.url
    });
    //jQuery('#messages').append(li);
    jQuery('#messages').append(html);
    scrollToBottom();
});

var locationButton = jQuery('#send-location')//jQuery selector that targets the button we just created 
locationButton.on('click', function() {//adds a listener, equivalent to jQuery('#send-location').on     Adds the click event and a callback function for the click event
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser')//default alert button 
    }
    locationButton.attr('disabled', 'disabled').text('Sending location...');//the disabled attribute equal to the disabled. Blocks the send button when we send the location to prevent spam sending(dureaza cateva secunde sa se trimita locatia )
    navigator.geolocation.getCurrentPosition(function (position){//first argument is the executing function that returns the location of the user
        //success case
        locationButton.removeAttr('disabled').text("Send location");//removes the disabled attribute we difined above, reanabling the button 
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            langitude: position.coords.longitude
        })
    }, function(){//second function is the error function
        locationButton.removeAttr('disabled').text("Send location");
        alert('Unable to fetch location.');
    });
});