var expect = require('expect');
var {generateMessage} = require('./message');
describe('generateMessage', () => {
    it('should generate correct message object', () => {//no need for done because it is a synchronous call 
        var res = generateMessage("Me", "Hello");
        expect(res.from).toBe("Me");
        expect(res.text).toBe("Hello");
        expect(res.createdAt).toBeA('number');
    });
});