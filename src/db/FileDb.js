const fs = require('fs');


module.exports.write = function (fileName, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path(fileName), JSON.stringify(data, null, 4), err => {
      resolve(err)
    })
  });
};

module.exports.read = function (fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(path(fileName), {encoding: 'utf-8'}, (err, data) => (
      err ? reject(err) : resolve(JSON.parse(data))
    ));
  });
};

const path = fileName => __dirname + '/../cache/' + fileName + '.json';