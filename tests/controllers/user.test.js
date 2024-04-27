const UserController = require('../../controllers/user')
const Member = require('../../models').Member
const Author = require('../../models').Author

describe('UserController', () => { 
    let req = {
        body: {
            name: 'fadhil',
            email : 'dyl@mail.com',
            password: '123'
        }
    }
    let res = jest.fn()
    let next = jest.fn()

    describe('static create member', () => { 
        test('controller has static create member', () => { 
            expect(typeof UserController.createMember).toBe('function')
         })
         test('static create will call Member.create', () => { 
            jest.spyOn(Member, 'create').mockResolvedValueOnce({})

            UserController.createMember(req,res,next)
            expect(Member.create).toHaveBeenCalled()
          })
         test('static create will call Author.create', () => { 
            jest.spyOn(Author, 'create').mockResolvedValueOnce({})

            UserController.createAuthor(req,res,next)
            expect(Author.create).toHaveBeenCalled()
          })
     })
     describe('static login', () => { 
        test('controller has static login', () => { 
            expect(typeof UserController.login).toBe('function')
         })
         test('static login will call Member.findOne', () => { 
            jest.spyOn(Member, 'findOne').mockResolvedValueOnce({})

            UserController.login(req,res,next)
            expect(Member.findOne).toHaveBeenCalled()
          })
         test('static login will call Author.findOne', () => { 
            jest.spyOn(Author, 'findOne').mockResolvedValueOnce({})

            UserController.login(req,res,next)
            expect(Author.findOne).toHaveBeenCalled()
          })
      })
 })