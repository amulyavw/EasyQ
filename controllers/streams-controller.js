// API for inserting streams in the popup form
var express=require("express");
var connection = require('./../config');
var path = require('path');
module.exports.streams=function(req,res){

var streams=[]
connection.query('Select id, name from streams', function(error, rows, fields){
  if(error){
      res.status(400).json({
      status:false,
      message:'incomplete entries'
    })
  }
  for(var i=0; i<rows.length; i++){
      streams.push({
        id:rows[i].id,
        name: rows[i].name
      })
  }
  res.status(200).json({
    streams:streams,
    semesters: [1,2,3,4,5,6,7,8],
    status: true,
    message: 'successful!'
  })
})
}
