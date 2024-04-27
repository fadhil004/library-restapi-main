const { hashPassword, comparePassword } = require('../../helpers/bcrypt')

describe('bcrypt', () => { 
    let hashedPassword
    const plainPassword = 'password'

    beforeAll(() => {
        hashedPassword = hashPassword(plainPassword)
    })

    describe('hashPassword', () => { 
        describe('positive case', () => { 
            test('hashPassword should return string', () => { 
                expect(typeof hashedPassword).toBe('string')
                expect(hashedPassword).not.toBe(plainPassword)
             })
         })
         describe('negative case', () => { 
            test('invalid input empty params: should throw an error', () => {
                expect(() => hashPassword()).toThrow(Error)
            })
            test('invalid input paramns number: should throw an error', () => {
                expect(() => hashPassword(123)).toThrow(Error)
            })
          })
     })
     describe('compare passowrd', () => { 
        describe('positive case', () => { 
            test('hashedPassword and plainPassword should return true', () => { 
                const result = comparePassword(plainPassword, hashedPassword)
                expect(result).toBe(true)
             })
             test('any string and hashedPassword should return false', () => { 
                const result = comparePassword('word', hashedPassword)
                expect(result).toBe(false)
              })
         })
         
      })
 })