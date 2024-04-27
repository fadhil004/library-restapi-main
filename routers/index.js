const express = require('express');
const router = express.Router()
const BookController = require('../controllers/book')
const UserController = require('../controllers/user');
const { authentication } = require('../middlewares/authentication');
const { authorization } = require('../middlewares/authorization');



router.post('/register', UserController.createMember)
router.post('/register/author', UserController.createAuthor)
router.post('/login', UserController.login)

router.use(authentication)
router.get('/books', BookController.readAll)
router.get('/books/:id', BookController.readOne)
router.post('/books/loan/:id', BookController.loan)
router.use(authorization)
router.post('/books/add', BookController.create)
router.patch('/books/edit/:id', BookController.update)
router.delete('/books/delete/:id', BookController.delete)

module.exports = router