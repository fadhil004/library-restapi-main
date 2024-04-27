const { authentication } = require('../../middlewares/authentication')
const jwt = require('../../helpers/jwt')

describe('authentication', () => { 
    test('authentication is a function', () => { 
        expect(typeof authentication).toBe('function')
     })
     test('authentication call verify token', () => {
        let req = {
            headers: {
                token: 'any token'
            }
        }

        let res = jest.fn()
        let next = jest.fn()

        jest.spyOn(jwt,'verifyToken').mockResolvedValueOnce({})

        authentication(req,res, next)
        expect(jwt.verifyToken).toHaveBeenCalled()
     })
 })