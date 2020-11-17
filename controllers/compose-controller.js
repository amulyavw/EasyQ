// API for posting questions
var express=require("express");
var connection = require('./../config');
var path = require('path');
var user_name;

module.exports.question=function(req,res){
    console.log(req.body);
    var regno = req.body.regNo;

    getUserId(regno, function(userId){
      var post={
          question:req.body.question,
          user_id:userId
      }
      console.log(user_name)
      connection.query('INSERT INTO questions Set?', post, function (error, results, fields)
      {
        if (error) {
          console.log(error);
          res.status(400).json({
            status: false,
            message: 'there are some error with query'
          })
        }
          res.json({
              status:true,
            })
      })
    })
}

  var getUserId = function(regno, callback){
    console.log(regno);

    connection.query('select * from users where regNo=?',[regno], function(err, results, fields){
      if(err){
        throw(err);
      }
      else{
        user_id=results[0].id;
        user_name=results[0].firstName +" "+results[0].lastName;
        callback(user_id, user_name)
      }
    })
  }
