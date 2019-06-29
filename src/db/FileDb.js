const fsp = require('fs').promises;
const fs = require('fs');
const p = require('path');


module.exports.exists = async function (fileName) {
  return await fs.existsSync(path(fileName));
};

module.exports.write = async function (fileName, data) {
  await fsp.writeFile(path(fileName), JSON.stringify(data, null, 4));
};

module.exports.read = async function (fileName) {
  let data = await fsp.readFile(path(fileName), 'utf8');
  return JSON.parse(data);
};

module.exports.remove = async function (fileName) {
  await fs.unlink(path(fileName), err => {
    if (err) return Promise.reject(err);
  });
};

const path = fileName => p.join(__dirname, '/../../cache/', fileName + '.json');