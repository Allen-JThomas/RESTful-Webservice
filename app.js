var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

var db
if(process.env.ENV == 'Test'){
  //if this doesnt exist mongoose will create one for us
  mongoose.connect('mongodb://localhost/libraryApp_test')
}
else{
  mongoose.connect('mongodb://localhost/libraryApp')
}
var Book = require('./models/bookModel')

var app = express()

var port = process.env.PORT || 3000

var bookRouter = require('./Routes/bookRoutes')(Book)

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/api', bookRouter)

// root
app.get('/', function(req, res){
  res.send('welcome to my api')
})

app.listen(port, function(){
  console.log('running on port' + port)
})

module.exports = app