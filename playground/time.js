//timestamp of 1000 represents Jan 1st 1970 00:00:01 am
var moment = require('moment');
var date = moment();//creates a new moment object that represents the current place in time
date.subtract(1,'year').add(12,'months');
console.log(date.format('MMM Do YYYY'));//grabs the shorthand version for the current month and for the year


