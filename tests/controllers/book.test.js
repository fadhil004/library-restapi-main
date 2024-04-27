const BookController = require('../../controllers/book')
const Book = require('../../models').Book
const Author = require('../../models').Author
const sequelize = require('../../models').sequelize;

describe('BookController', () => { 
    let req = {
        decoded: {
            id: 1
        },
        params: {
            id: 1
        },
        body: {}
    }
    let res = jest.fn()
    let next = jest.fn()
    describe('static create', () => { 
        test('controller has static create', () => { 
            expect(typeof BookController.create).toBe('function')
         })
         test('static create will call Book.create', async () => { 
             req.body = {
                 title: 'test',
                 releaseDate: 'test',
                 genre: 'test',
                 stock: 5
                }
                
                jest.spyOn(Author, 'findByPk').mockResolvedValueOnce({ name: 'name' });
                jest.spyOn(Book, 'create').mockResolvedValueOnce({})
                await BookController.create(req,res,next)
                expect(Book.create).toHaveBeenCalled()
            })
            
        })
      describe('static read all', () => { 
        test('controller has static readAll', () => { 
            expect(typeof BookController.readAll).toBe('function')
         })
         test('static readAll will call Book.findAll', () => { 
            jest.spyOn(Book, 'findAll').mockResolvedValueOnce({})

            BookController.readAll(req,res,next)
            expect(Book.findAll).toHaveBeenCalled()
          })
       })

       describe('static readOne', () => { 
        test('controller has static readOne', () => { 
            expect(typeof BookController.readOne).toBe('function')
         })
         test('static readOne will call Book.findAll', () => { 
            req.params = {}
            req.params.id = 1
            jest.spyOn(Book, 'findByPk').mockResolvedValueOnce({})

            BookController.readOne(req,res,next)
            expect(Book.findByPk).toHaveBeenCalled()
          })
       })
       describe('static update', () => { 
        test('controller has static update', () => { 
            expect(typeof BookController.update).toBe('function')
         })
         test('static update will call Book.update', () => { 
            req.params ={
                id: 1
            }
            jest.spyOn(Book, 'update').mockResolvedValueOnce({})

            BookController.update(req,res,next)
            expect(Book.update).toHaveBeenCalled()
          })
        })
        describe('static delete', () => { 
            test('controller has static delete', () => { 
                expect(typeof BookController.delete).toBe('function')
             })
             test('static delete will call Book.destroy', () => { 
                req.params ={
                    id: 1
                }
                jest.spyOn(Book, 'destroy').mockResolvedValueOnce({})
    
                BookController.delete(req,res,next)
                expect(Book.destroy).toHaveBeenCalled()
              })
         })
         describe('static loan', () => {
            test('should return 400 if book is already loaned by the member', async () => { 
                jest.spyOn(sequelize.models.Loan, 'findOne').mockResolvedValueOnce({});
        
                await BookController.loan(req, {}, next);
                expect(sequelize.models.Loan.findOne).toHaveBeenCalled();
                expect(next).toHaveBeenCalled(); 
            });
        
            test('should return 400 if book is out of stock', async () => { 
                jest.spyOn(sequelize.models.Loan, 'findOne').mockResolvedValueOnce(null);
                jest.spyOn(Book, 'findByPk').mockResolvedValueOnce({ stock: 0 });
        
                await BookController.loan(req, {}, next);
                expect(Book.findByPk).toHaveBeenCalled();
                expect(next).toHaveBeenCalled(); 
            });
        
            test('should loan book successfully', async () => { 
                jest.spyOn(sequelize.models.Loan, 'findOne').mockResolvedValueOnce(null);
                jest.spyOn(Book, 'findByPk').mockResolvedValueOnce({ stock: 2, AuthorId: 1 });
                jest.spyOn(Author, 'findByPk').mockResolvedValueOnce({ sale: 5, save: jest.fn().mockResolvedValueOnce() });
        
                await BookController.loan(req, {}, next);
                expect(Author.findByPk).toHaveBeenCalled();
                expect(next).toHaveBeenCalled(); 
            });
        });

      
 })


 