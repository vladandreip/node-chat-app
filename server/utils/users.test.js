const expect = require('expect');
const {Users} = require('./users');
describe('Users', () =>{
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id:'1',
            name:'mike',
            room:'node'
        },{
            id:'2',
            name:'jen',
            room:'react'
        },{
            id:'3',
            name:'julie',
            room:'node'
        }]
    });
    it('should add new user', ()=>{
        var users = new Users();
        var user = {
            id: '123',
            name: 'vlad',
            room: 'Office fans'
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        //toEqual is used for arrays and objects
        expect(users.users).toEqual([user]);
    });
    it('should return names for node course',() =>{
        var userList = users.getUserList('node');//defined in the beforeEach
        expect(userList).toEqual(['mike','julie']);
    });
    it('should return names for react course',() =>{
        var userList = users.getUserList('react');//defined in the beforeEach
        expect(userList).toEqual(['jen']);
    });
    it('should remove a user', ()=>{
        var userRemoved = users.removeUser(1);
        expect(userRemoved.name).toBe('mike');
    });
    it('should not remove a user', ()=>{
        //assert that array has not changed
        //pass crap id
        var userRemoved = users.removeUser(12);
        expect(userRemoved).toNotExist();

    });
    it('should find user', ()=>{
        var userFound = users.getUser(1);
        expect(userFound.name).toBe('mike');
    });
    it('should not find user', ()=>{
        var userFound = users.getUser(10);
        expect(userFound).toNotExist();
    });
});