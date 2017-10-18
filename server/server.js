//into the package.json we define "start", telling heroku how to start the app
//also we define "engines" telling heroku what version of node to use 
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io')

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
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    })
});//listen to a connection.Lets you do something when a new connection comes in 
//we can listen for a disconecting client and we can do something when that happens: in our case we prin a message
server.listen(port, ()=>{//when you call app.listen it calls http.createServer() passing the app to the argument createServer
    //we will call server.listen instead of app.listen 
    console.log(`Server is up on port ${port}`);
});
