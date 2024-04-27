const Book = require('../models').Book
const Author = require('../models').Author

const authorization = (req, res ,next) => {
        const authorId = req.decoded.id
        const bookId = req.params.id

        Author.findByPk(authorId)
        .then(author => {
            if (author && author.id === authorId){
                return
            } 
        })
        .catch(err => {
            next({status: 403,message: 'Access forbidden'})
        })

        const checkBookId = req.route.path === '/books/add'
        if (checkBookId) {
            return next();
        }

        Book.findByPk(bookId)
        .then(book => {
            if (!book) {
                next({status: 400, message: 'Book not found'})
            }
            if (book.authorId === authorId){
                next()
            } else {
                next({status: 403,message: 'Access forbidden'})
            }
        })
        .catch(error => {
            next({status: 404, message: 'Book not found'})
        });
}

module.exports = { authorization }
