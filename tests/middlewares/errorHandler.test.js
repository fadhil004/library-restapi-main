const { errorHandler } = require('../../middlewares/errorHandler')

describe('ErrorHandler', () => { 
    test('ErrorHandler is a function', () => { 
        expect(typeof errorHandler).toBe('function')
     })
 })