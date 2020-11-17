const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./config');
const multer = require('multer');

var registerController=require('./controllers/register-controller');
var authenticateController=require('./controllers/authenticate-controller');
var streamsController=require('./controllers/streams-controller');
var navController=require('./controllers/nav-controller');
var composeController=require('./controllers/compose-controller');
var questionController=require('./controllers/question-controller');

const app = express();
const upload = multer();
app.use(express.static("public"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/welcome.html');
})
app.get('/login', function(req,res){
  res.sendFile(__dirname + '/login.html')
})
app.post('/Q&A', function(req, res){
	res.sendFile(__dirname + '/qna.html')
})
app.get('/assignments', function(req, res){
	res.sendFile(__dirname + '/assignments.html')
})
app.get('/Q&A', function(req, res){
	res.sendFile(__dirname + '/qna.html')
})
app.get('/paper', function(req, res){
	res.sendFile(__dirname + '/papers.html')
})



app.get('/questions',questionController.questions)
app.get('/details',streamsController.streams)
app.get('/courses',navController.courses)
app.post('/compose',upload.none(), composeController.question)
app.post('/reg', upload.none(), registerController.register)
app.post('/login', upload.none(), authenticateController.authenticate)

app.listen(3000, function(){
    console.log("Server Started on port 3000");
});
