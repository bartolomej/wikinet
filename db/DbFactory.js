const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'rootPass',
  database : 'wiki'
});

connection.connect();

module.exports.query = async (queryString, handler) => {
  return new Promise((resolve, reject) => {
    if (handler === undefined) {
      connection.query(queryString, (error, results) => (
        error ? reject(error) : resolve(results)
      ));
    } else {
      connection.query(queryString, handler);
    }
  })
};