const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/welcome.html');
})

app.get('/signup_stud', function(req,res){
  res.sendFile(__dirname + '/signup_stud.html')
})

app.get('/signup_teach', function(req,res){
  res.sendFile(__dirname + '/signup_teach.html')
})

app.listen(3000, function(){
    console.log("Server Started on port 3000");
});
