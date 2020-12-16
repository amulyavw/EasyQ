var express=require("express");
var connection = require('./../config');
var path = require('path');
var user_name;

module.exports.answer=function(req,res){
    console.log(req.body);
    var regno = req.body.regNo;
    var questionId = req.body.questionId;
    console.log(questionId);

    getUserId(regno, function(userId){
      var post={
          question_id:questionId,
          user_id:userId,
          answer:req.body.answer
      }
      console.log(user_name)
      connection.query('INSERT INTO answers Set?', post, function (error, results, fields)
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
