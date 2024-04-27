const { authorization } = require('../../middlewares/authorization')
const Book = require('../../models').Book

describe('Authorization', () => { 
    test('authorization is a function', () => { 
        expect(typeof authorization).toBe('function')
     })
     test('authorization call Book.findByPk', () => { 
        let req = {
            params: {
                id: 1
            },
            decoded: {
                id: 2
            }
        }

        let res = jest.fn()
        let next = jest.fn()

        jest.spyOn(Book, 'findByPk').mockResolvedValueOnce({})

        authorization(req,res,next)
        expect(Book.findByPk).toHaveBeenCalled()
      })
 })