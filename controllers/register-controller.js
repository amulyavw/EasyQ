var express=require("express");
var connection = require('./../config');
var path = require('path');
const md5 = require('md5');

module.exports.register=function(req,res){
    var today = new Date();
    var students={
        "regno":req.body.regNo,
        "firstname":req.body.firstname,
        "lastname":req.body.lastname,
        "email":req.body.email,
        "password":md5(req.body.password),
        "created_at":today,
        "updated_at":today
    }
    connection.query('INSERT INTO students SET ?',students, function (error, results, fields) {
      if (error) {
        console.log(error)
        res.json({
            status:false,
            message:'there are some error with query'
        })
      }
      else{
        	res.sendFile(path.join(__dirname , '../' , 'register.html'))
      }
    });
}
