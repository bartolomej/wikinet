const mysql = require('mysql');
let connection;

module.exports.init = dbConfig => {
  connection = mysql.createConnection(dbConfig);
  connection.connect();
};

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