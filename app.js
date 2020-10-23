const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./config');

var registerController=require('./controllers/register-controller');
var authenticateController=require('./controllers/authenticate-controller');


const app = express();

app.use(express.static("public"));
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

app.post('/reg',registerController.register)
app.post('/login', authenticateController.authenticate)

app.listen(3000, function(){
    console.log("Server Started on port 3000");
});
