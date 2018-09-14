var should = require('should')
var request = require('supertest')
var app = require('../app')
var Book = require('../models/bookModel')
var agent = request.agent(app)

describe('brook Crud Test', function(){
  it('should allow a book to be posted and return a read and _id', function(done){
    var bookPost = {title:'new Book', author:'AT', genre: 'fiction'}

    agent.post('/api/books')
      .send(bookPost)
      .expect(200)
      .end(function(err, results){
        results.body.read.should.not.equal(false)
        results.body.should.have.property('_id')
        done()
      })
  })

  afterEach(function(done){
    Book.remove().exec()
    done()
  })
})