var express = require("express");
var connection = require('./../config');
var path = require('path');
var question;
module.exports.answers = function(req, res) {

  var answers = []
  var questionId = req.query.questionId;
  console.log()
  getQuestion(questionId, function(question) {

    connection.query("SELECT users.id as user_id, users.regno, concat(users.firstName,' ', users.lastName)as user_name, answers.id as answer_id, answers.answer, answers.question_id FROM answers INNER JOIN users ON answers.user_id=users.id  WHERE answers.question_id=? ORDER BY answer_id DESC", [questionId], function(error, results, fields) {
      if (error) {
        console.log(error);
        res.status(400).json({
          status: false,
          message: 'Invalid'
        })
      }
      for (var i = 0; i < results.length; i++) {
        answers.push({
          user_id: results[i].user_id,
          user_name: results[i].user_name,
          user_regNo: results[i].user_regno,
          answer: results[i].answer,
          answer_id: results[i].answer_id,
        })
      }

      res.json({
        question: question,
        answers: answers
      })

    })
  })
}
var getQuestion = function(questionId, callback) {
  console.log(questionId);
  connection.query('Select question from questions where id=?', [questionId], function(error, results, fields) {
    if (error) {
      console.log(error);
      res.status(400).json({
        status: false,
        message: 'there are some error with query'
      })
    } else {
      question = results[0].question
      callback(question)
    }
  })
}
