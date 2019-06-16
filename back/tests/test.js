process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHtp = require('chai-http')
const app = require('../app')
const User = require('../models/user')

const should = chai.should()
chai.use(chaiHtp)

describe('Users', () => {
  beforeEach(done => {
    User.deleteMany({}, err => {
      done()
    })
  })
  describe('GET /users', () => {
    it('should GET all users', done => {
      chai
        .request(app)
        .get('/api/users')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.be.eql(0)
          done()
        })
    })
  })

  describe('POST /users', () => {
    it('should not POST a user without birthdate', done => {
      const user = {
        name: 'nikolaj'
      }
      chai
        .request(app)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(206)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          res.body.errors.should.have.property('birthdate')
          res.body.errors.birthdate.should.have.property('kind').eql('required')
          done()
        })
    })
    it('should POST a user', done => {
      const user = {
        name: 'nikolaj',
        birthdate: new Date()
      }
      chai
        .request(app)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('_id')
          res.body.should.have.property('name')
          res.body.should.have.property('birthdate')
          done()
        })
    })
  })
})
