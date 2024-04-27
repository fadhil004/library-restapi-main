const { Book, Author, sequelize} = require('../models')



class BookController{
    static readAll(req, res, next){
        Book.findAll()
        .then(books => {
            res.status(200).json(books)
        })
        .catch(next)
    }
    
    static readOne(req, res, next){
        Book.findByPk(req.params.id)
        .then(books => {
            res.status(200).json(books)
        })
        .catch(next)
    }

    static create(req, res, next){
        let authorName
        const authorId = req.decoded.id
        const {title,releaseDate,genre,stock} = req.body
        Author.findByPk(authorId)
        .then(author => {
            authorName = author.name

            return Book.create({
                title,
                author: authorName,
                releaseDate,
                genre,
                stock: Number(stock),
                authorId: authorId
            })
        })
        .then(book => {
            res.status(201).json(book)
        })
        .catch(next)
    }

    static loan(req, res, next){
        const memberId = req.decoded.id; 
        const bookId = req.params.id;
    
        sequelize.models.Loan.findOne({
            where: {
                BookId: bookId,
                MemberId: memberId
            }
        })
        .then(existingLoan => {
            if(existingLoan) {
                return res.status(400).json({ message: 'You have already borrowed this book' });
            } else {
                Book.findByPk(bookId)
                .then(book => {
                    if (book.stock < 1){
                        return res.status(400).json({ message: 'Book is out of stock' });
                    }
                    book.stock -= 1;
    
                    // Perbarui penjualan penulis
                    Author.findByPk(book.AuthorId)
                    .then(author => {
                        if (author) {
                            author.sale += 1;
                            return author.save();
                        } else {
                            throw new Error('Author not found');
                        }
                    })
                    .then(() => {
                        return book.save();
                    })
                    .then(book => {
                        sequelize.models.Loan.create({
                            BookId: book.id,
                            MemberId: memberId
                        })
                        .then(loan => {
                            res.status(201).json({ message: 'Book loaned successfully' });
                        })
                        .catch(next);
                    })
                    .catch(next);
                })
                .catch(next);
            }
        })
        .catch(next);
    }    
    

    static update(req, res, next){
        const updatedProduct = {
            title: req.body.title,
            genre: req.body.genre,
            releaseDate: new Date(req.body.releaseDate),
            stock: Number(req.body.stock)
        }
        Book.update(updatedProduct, {
            where: {
                id: req.params.id
            },
        })
        .then(books => {
            res.status(200).json(books)
        })
        .catch(next)
    }

    static delete(req, res, next){
        Book.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }

}

module.exports = BookController