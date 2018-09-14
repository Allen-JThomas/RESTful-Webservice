var express = require('express')

var routes = function(Book){
  var bookRouter = express.Router()

  var bookController = require('../controllers/bookController')(Book)
  bookRouter.route('/books')
  //function to call for the /books get request
  //these have controllers, but put, patch, and delete dont
  .get(bookController.get)
  .post(bookController.post)

  //tells the routes to the middleware only for a route
  //a bookId
  bookRouter.use('/books/:bookId', function(req,res, next){
    Book.findById(req.params.bookId, function(err, book){
      if(err){
        res.status(500).send(err)
      }
      else if(book){
        req.book = book
        next()
      }
      else{
        res.status(404).send('no book found')
      }
    })
  })

  bookRouter.route('/books/:bookId')
  //function to get individual book
  .get(function(req, res){
    //to give consumer option to filer by this books genre
    var returnBook = req.book.toJSON()
    returnBook.links = {}
    var newlink= 'http://' + req.headers.host + '/api/books/?genre=' + returnBook.genre
    //replaces spaces with %20
    returnBook.links.filterByThisGenre = newlink.replace(' ', '%20')
    res.json(returnBook)
  })
  .put(function(req, res){
    req.book.title = req.body.title
    req.book.author = req.body.author
    req.book.genre = req.body.genre
    req.book.read = req.body.read
    //this is not async
    req.book.save()
    res.json(req.book)
  })
  .patch(function(req, res){
    //do this to not chance the mongo id of the book
    if(req.body._id){
      delete(req.body._id)
    }
    for(var key in req.body){
      req.book[key] = req.body[key]
    }
    //this is done to make the call async
    req.book.save(function(err){
      if(err){
        res.status(500).send(err)
      }
      else{
        res.json(req.book)
      }
    })
  })
  .delete(function(req, res){
    //async
    req.book.remove(function(err){
      if(err){
        res.status(500).send(err)
      }
      else[
        res.status(204).send('Removed')
      ]
    })
  })

  return bookRouter
}

module.exports = routes