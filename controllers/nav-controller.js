// API for getting subjects in the sidebar.
var express=require("express");
var connection = require('./../config');
var path = require('path');

module.exports.courses=function(req,res){
var courses=[]
var semester = req.query.semester;
var stream_id = req.query.stream;
console.log(semester, stream_id);
var sql = 'SELECT name, id FROM courses WHERE semester = ? and stream_id = ?';
connection.query(sql, [semester, stream_id], function (error, results, fields){
  if(error){
      res.status(400).json({
      status:false,
      message:'incomplete entries'
    })
  }
  for(var i=0; i<results.length; i++){
      courses.push({
        name: results[i].name,
        id: results[i].id
      })
  }
    res.status(200).json({
      courses:courses,
      semester: semester,
      stream_id: stream_id,
      status:true
    })
})
}
