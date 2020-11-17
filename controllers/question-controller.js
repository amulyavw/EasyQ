
var express=require("express");
var connection = require('./../config');
var path = require('path');
module.exports.questions=function(req,res){

var questions=[]
connection.query("SELECT users.id as user_id, users.regno, concat(users.firstName,' ', users.lastName)as user_name, questions.id as question_id, questions.question, questions.course_id FROM questions INNER JOIN users ON questions.user_id=users.id ORDER BY question_id DESC", function(error,results,fields){
  if(error){
      res.status(400).json({
      status:false,
      message:'incomplete entries'
    })
  }
  for(var i=0; i<results.length; i++){
      questions.push({
        user_id:results[i].user_id,
        user_name: results[i].user_name,
        user_regNo: results[i].user_regno,
        question_id:results[i].question_id,
        question:results[i].question
      })
  }
  res.status(200).json({
    questions:questions,
    status: true,
    message: 'successful!'
  })
})
}
