var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message');
describe('generateMessage', () => {
    it('should generate correct message object', () => {//no need for done because it is a synchronous call 
        var res = generateMessage("Me", "Hello");
        expect(res.from).toBe("Me");
        expect(res.text).toBe("Hello");
        expect(res.createdAt).toBeA('number');
    });
    describe('generateLocationMessage', () => {
        it('should generate correct location object', () => {
            expect(generateLocationMessage('me',1,1).url).toBe('https://www.google.com/maps?q=1,1')
        });
    });
});