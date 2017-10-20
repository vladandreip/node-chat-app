//stores utility functions related to messaging 
var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    }
}
module.exports = {generateMessage};// <=> module.exports.generateMessage=generateMessage