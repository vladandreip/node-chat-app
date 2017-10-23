//into the package.json we define "start", telling heroku how to start the app
//also we define "engines" telling heroku what version of node to use 
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io')
const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;//for 
var app = express();//express uses a built in node module called  http to create this server
var server = http.createServer(app);//we are using the http server as opposed to the express server.We are doing this because we need it for the socket.io
//console.log(__dirname + '/../public');
//console.log(publicPath)
var io = socketIO(server);//we get back our web sockets server.This is how we are going to communicate between the server and the client.We are ready to accept new connections
app.use(express.static(publicPath));
//connection event over the server
//as the event fires the client prints New user connected 
io.on('connection', (socket) => {//the event is called with a socket argument similar to the one from index
    
    console.log('New user connected');
    //this data will be sent from the servet to the client
    socket.emit('newEmail', {
        from: 'mike@example.com',
        text:'Please die',
        createAt: 123
    })//creates the event instead of listening to it. Must be exactly as the one specified in the script
    socket.on('createEmail', (newEmail) => {//in the arrow function we have the data expected to come along. Client -> server
        console.log('createEmail', newEmail);
    });
    // socket.emit('newMessage', {//socket.emit, emits an event to a single connection
    //     from: 'John',
    //     text: 'See you',
    //     createdAt: 1231234
    // })

    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));
    socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined'))
    socket.on('createMessage', (message, callback) => {
       console.log(message);
      //emits an event to every single connection 
       io.emit('newMessage', generateMessage(message.from,message.text));//when a user sends a message we want all of our users to see that message 
       callback('This is from the server');//will. This shows that the data succesfully reached the server and a message printed. You can send data back by adding a param in the function
    // socket.broadcast.emit('newMessage', {//emits to everyone exccept for this socket(user)
    //     from: message.from,
    //     text: message.text,
    //     createdAt: new Date().getTime()
    // });
});
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });


});//listen to a connection.Lets you do something when a new connection comes in 
//we can listen for a disconecting client and we can do something when that happens: in our case we prin a message
server.listen(port, ()=>{//when you call app.listen it calls http.createServer() passing the app to the argument createServer
    //we will call server.listen instead of app.listen 
    console.log(`Server is up on port ${port}`);
});
