const md5 = require('md5');
var connection = require('./../config');

  module.exports.authenticate = function(req, res) {
  var regno = req.body.regNo;
  var password = md5(req.body.password);


  connection.query('SELECT * FROM students WHERE regno = ?', [regno], function(error, results, fields) {
      if (error) {
        res.json({
          status: false,
          message: 'there are some error with query'
        })
      }
    else {
        if (results.length > 0) {
          if (result.password == password) {
            res.sendFile(path.join(__dirname, '../', 'register.html'))
          }
        }
        else {
          res.json({
            status: false,
            message: "Registration number and password does not match"
          });
        }

      }
      // else {
      //   res.json({
      //     status: false,
      //     message: "Registration does not exits"
      //   })
      // }
  });
}
