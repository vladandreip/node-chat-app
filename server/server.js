//into the package.json we define "start", telling heroku how to start the app
//also we define "engines" telling heroku what version of node to use 
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;//for heroku

const express = require('express');
var app = express();
//console.log(__dirname + '/../public');
//console.log(publicPath);
app.use(express.static(publicPath));
app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});
