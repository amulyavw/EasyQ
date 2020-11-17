const md5 = require('md5');
var connection = require('./../config');
var path = require ('path');

  module.exports.authenticate = function(req, res) {
  console.log(req.body);
  var regno = req.body.regNo;
  var password = md5(req.body.password);


  connection.query('SELECT * FROM users WHERE regno = ?', [regno], function(error, results, fields) {
      if (error) {
        res.status(400).json({
          status: false,
          message: 'there are some error with query'
        })
      }
    else {
        if (results.length > 0) {
          if (results[0].password == password) {
            res.json({
              status:true,
            })
          }
          else{
            res.status(400).json({
              status:false,
              message:"wrong password"
            })
          }
        }
        else {
          res.status(400).json({
            status: false,
            message: "The password doesnot belong to the registeration number"
          });
        }
      }
  });
}
