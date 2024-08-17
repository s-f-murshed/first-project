var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sfm2002",
  database: "LMS"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM books", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});
