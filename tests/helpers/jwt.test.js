const { generateToken, verifyToken } = require('../../helpers/jwt');

describe('jwt', () => { 
    let token
    const payload = {
        id: 1,
        email: 'doe@mail.com'
    }

    beforeAll(() => {
        token = generateToken(payload)
    })

    describe('generate token', () => { 
        describe('positive case', () => { 
            test('generate token should return string', () => { 
                expect(typeof token).toBe('string')
                expect(token).not.toBe(payload)
             })
         })
        describe('negative case', () => { 
            test('invalid input empty params should throw error', () => { 
                expect(() => generateToken()).toThrow(Error)
             })
         })
     })
     describe('verify token', () => { 
        describe('positive case', () => { 
            test('verify token should return payload', () => { 
                const result = verifyToken(token)
                expect(result).toHaveProperty('id')
                expect(result).toHaveProperty('email')
                expect(result.id).toBe(payload.id)
             })
         })
        describe('negative case', () => { 
            test('input invalid should throw an error', () => {
                expect(() => verifyToken()).toThrow(Error)
            })
         })
      })
 })