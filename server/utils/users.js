
//ES6 class
class Users{
    constructor (){
        this.users = [];
    }
    addUser (id, name, room) {
      var user = {id, name, room};
      this.users.push(user);
      return user;
    }
    removeUser (id) {
        var user = this.getUser(id);
    
        if (user) {
          this.users = this.users.filter((user) => user.id !== id);
        }
    
        return user;
      }
    getUser (id){
        var users = this.users.filter((user)=>{
            return user.id == id;
        })
        var user = users[0];
        return user;
    }
    getUserList (room){
        var users = this.users.filter((user)=>{ //function that calls for each individual user
            return user.room === room;// if it is true, the user we applyed the filter on will be stored in user variable

        });
        var namesArray = users.map((user) => { //map creates an array of strings that represents the name of each user 
            return user.name;
        });
        return namesArray;
    }
}
module.exports = {Users};