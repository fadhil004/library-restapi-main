const express = require('express');
const router = express.Router()
const BookController = require('../controllers/book')
const UserController = require('../controllers/user');
const { authentication } = require('../middlewares/authentication');
const { authorization } = require('../middlewares/authorization');



router.post('/register', UserController.createMember)
router.post('/register/author', UserController.createAuthor)
router.post('/login', UserController.login)

router.get('/books', authentication, BookController.readAll)
router.get('/books/:id', authentication, BookController.readOne)
router.post('/books/loan/:id', authentication, BookController.loan)

router.post('/books/add', authentication, authorization, BookController.create)
router.patch('/books/edit/:id', authentication, authorization, BookController.update)
router.delete('/books/delete/:id', authentication, authorization, BookController.delete)

module.exports = router