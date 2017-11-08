const {Users} = require('../server/utils/users');
var user = new Users();
user.addUser('1','a','c');
user.addUser('2','b','c');
user.addUser('3','c','c');
console.log(user.getUserList('c'))
console.log(user.removeUser('1'));
console.log(user.getUserList('c'))