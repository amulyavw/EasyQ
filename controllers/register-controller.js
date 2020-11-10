var express=require("express");
var connection = require('./../config');
var path = require('path');
const md5 = require('md5');

module.exports.register=function(req,res){
    var today = new Date();
    var students={
        "firstname":req.body.fname,
        "lastname":req.body.lname,
        "email":req.body.email,
        "regno":req.body.regNo,
        "password":md5(req.body.password),
        "created_at":today,
        "updated_at":today
    }
    connection.query('INSERT INTO students SET ?',students, function (error, results, fields) {
      if (error) {
        console.log(error)
        res.status(400).json({
            status:false,
            message:'there are some error with query'
        })
      }
      else{
        res.json({
          status:true,
        })
      }
    });
}
