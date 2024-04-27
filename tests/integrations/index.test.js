const { app } = require('../../index');
const request = require('supertest');

describe('integration testing', () => { 
    let token,bookId

    describe('/POST register member', () => { 
        describe('positive case', () => { 
            test('should return object (id,name,email) with status code 201', (done) => { 
                request(app)
                .post('/register')
                .send({
                    name: 'fadhil',
                    email: 'dyl@mail.com',
                    password: '123'
                })
                .end((err, res) => {
                    expect(err).toBe(null)
                    expect(res.status).toBe(201)
                    expect(res.body).toHaveProperty('id')
                    done()
                })
             })
         })
         describe('negative case', () => { 
            test('should return error with status code 400 if input invalid', (done) => { 
                request(app)
                .post('/register')
                .send({})
                .end((err, res) => {
                    expect(err).toBe(null)
                    expect(res.status).toBe(400)
                    expect(res.body).toHaveProperty('err')
                    done()
                })
             })
          })
     })
    describe('/POST register author', () => { 
        describe('positive case', () => { 
            test('should return object (id,name,email) with status code 201', (done) => { 
                request(app)
                .post('/register/author')
                .send({
                    name: 'fadhil',
                    email: 'dyl@mail.com',
                    password: '123'
                })
                .end((err, res) => {
                    expect(err).toBe(null)
                    expect(res.status).toBe(201)
                    expect(res.body).toHaveProperty('id')
                    done()
                })
             })
         })
         describe('negative case', () => { 
            test('should return error with status code 400 if input invalid', (done) => { 
                request(app)
                .post('/register/athor')
                .send({})
                .end((err, res) => {
                    expect(err).toBe(null)
                    expect(res.status).toBe(400)
                    expect(res.body).toHaveProperty('err')
                    done()
                })
             })
          })
     })
    //  describe('/POST login', () => { 
    //     describe('positive case', () => { 
    //         test('should send an object (id, email, token) with status 200', (done) => { 
    //             request(app)
    //             .post('/login')
    //             .send({
    //                 email: 'dyl@mail.com',
    //                 password: '123'
    //             })
    //             .end((err, res) => {
    //                 expect(err).toBe(null)
    //                 expect(res.status).toBe(200)

    //                 token = res.body.token

    //                 expect(res.body).toHaveProperty('token', expect.any('String'))
    //                 expect(res.body).toHaveProperty('email', expect.any('String'))
    //                 expect(res.body).toHaveProperty('id', expect.any('Number'))
    //                 done()
    //             })
    //          })
    //      })
    //      describe('negative case', () => { 
    //         test('should return error with status code 400 if input password incorrect', (done) => { 
    //             request(app)
    //             .post('/login')
    //             .send({
    //                 email: 'dyl@mail.com',
    //                 password: '123'
    //             })
    //             .end((err, res) => {
    //                 expect(err).toBe(null)
    //                 expect(res.status).toBe(400)
    //                 expect(res.body).toHaveProperty('error')
    //                 done()
    //             })
    //          })
    //       })
    //   })
 })