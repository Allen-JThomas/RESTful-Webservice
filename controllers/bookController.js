var bookController = function(Book){
  var post = function(req, res){
    var book = new Book(req.body)
    //only posts if book has a title
    if(!req.body.title){
      res.status(400)
      res.send('Title is required')
    }
    else{
    //creates the new book to mongodb
    //this is also not async, look at patch to make it async
    book.save()
    res.status(201)
    res.send(book)
    }
  }
  var get = function(req, res){
    //this works
    // var query = req.query
    //but instead you could do
    //to not take random user input do somn like
    var query ={}
    if(req.query.genre){
      query.genre = req.query.genre
    }

    Book.find(query, function(err, books){
      if(err){
        console.log(err)
      }
      else {
        var returnBooks = []
        books.forEach((element, index, array) => {
          var newBook = element.toJSON()
          newBook.links = {}
          //to give the link to this book
          newBook.links.self = 'http://' + req.headers.host + '/api/books/' + newBook._id
          returnBooks.push(newBook)
        });
        res.json(returnBooks)
      }
    })
  }

  return {
    post, 
    get
  }
}
module.exports = bookController