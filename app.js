const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./config');
const multer = require('multer');

var registerController=require('./controllers/register-controller');
var authenticateController=require('./controllers/authenticate-controller');


const app = express();
const upload = multer();
app.use(express.static("public"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/welcome.html');
})

app.get('/signup_student', function(req,res){
  res.sendFile(__dirname + '/signup_student.html')
})

app.get('/signup_teacher', function(req,res){
  res.sendFile(__dirname + '/signup_teacher.html')
})
app.post('/Q&A', function(req, res){
	res.sendFile(__dirname + '/QnA.html')
})
app.get('/assignments', function(req, res){
	res.sendFile(__dirname + '/assignments.html')
})
app.get('/QnA', function(req, res){
	res.sendFile(__dirname + '/QnA.html')
})
app.get('/paper', function(req, res){
	res.sendFile(__dirname + '/papers.html')
})


app.post('/reg', upload.none(), registerController.register)
app.post('/login', upload.none(), authenticateController.authenticate)

app.listen(3000, function(){
    console.log("Server Started on port 3000");
});
