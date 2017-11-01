//stores utility functions related to messaging 
var moment = require('moment');
var generateMessage = (from, text) => {
    return {
        from,
        text,
        // createdAt: new Date().getTime()
        createdAt: moment.valueOf()//this is doing the same thing like the line above but, we want to be consistend in using moment
    }
}
var generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        // createdAt: new Date().getTime()
        createdAt: moment.valueOf()
    }
}
module.exports = {generateMessage, generateLocationMessage};// <=> module.exports.generateMessage=generateMessage