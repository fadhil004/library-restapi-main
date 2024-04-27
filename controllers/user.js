const { comparePassword, hashPassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt')
const { Member, Author } = require('../models')

class UserController{
    static createMember(req, res, next) {
        const { name, email, password} = req.body
        Member.create({
            name,
            email,
            password
        })
        .then(Member => {
            return res.status(201).json(Member)
        })
        .catch(err => {
            next({status: 400, message: err.message})
        })
    }

    static createAuthor(req, res, next) {
        const { name, email, password} = req.body
        Author.create({
            name,
            email,
            password
        })
        .then(Author => {
            res.status(201).json(Author)
        })
        .catch(err => {
            next({status: 400, message: err.message})
        })
    }

    static login(req, res, next) {
        const { email, password } = req.body
        
        const memberPromise = Member.findOne({
            where: {
                email,
            }
        })
        .then(member => {
            if (member && comparePassword(password, member.password)){
                let payload = {
                    id: member.id,
                    email: member.email
                }
                let token = generateToken(payload)
                return { id: member.id, email: member.email, token };
            }
            return null 
        }) 
        
        const authorPromise = Author.findOne({
            where: {
                email,
            }
        })
        .then(author => {
            if (author && comparePassword(password, author.password)){
                let payload = {
                    id: author.id,
                    email: author.email
                }
                let token = generateToken(payload)
                return { id: author.id, email: author.email, token };
            }
            return null 
        })
        
        Promise.all([memberPromise, authorPromise])
          .then(([memberResult, authorResult]) => {
            if (memberResult) {
                res.status(200).json(memberResult);
            } else if (authorResult) {
                res.status(200).json(authorResult);
            } else {
              next({ message: 'Invalid email/password', status: 401 });
            }
          })
          .catch(err => {
            next({status: 400, message: err.message})
        });
    }
}

module.exports = UserController