const { authorization } = require('../../middlewares/authorization')
const Book = require('../../models').Book
const Author = require('../../models').Author

describe('Authorization', () => {
    let req = {
        params: {
            id: 1
        },
        decoded: {
            id: 2
        },
        route:{
            path: ''
        }
    } 
    test('authorization is a function', () => { 
        expect(typeof authorization).toBe('function')
     })
     test('authorization call Book.findByPk', () => { 
        let res = jest.fn()
        let next = jest.fn()

        jest.spyOn(Book, 'findByPk').mockResolvedValueOnce({})

        authorization(req,res,next)
        expect(Book.findByPk).toHaveBeenCalled()
      })
      test('authorization call Author.findByPk', () => { 
        let res = jest.fn()
        let next = jest.fn()

        jest.spyOn(Author, 'findByPk').mockResolvedValueOnce({})

        authorization(req,res,next)
        expect(Author.findByPk).toHaveBeenCalled()
      })
      test('authorization call checkBookId', () => { 
        req.route.path = '/books/add'; 
        let res = jest.fn();
        let next = jest.fn();

        authorization(req, res, next);
        expect(next).toHaveBeenCalled(); 
      })
 })