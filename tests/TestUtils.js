const path = require('path');
const fs = require('fs');
const $ = require('cheerio');
const requestPromise = require('request-promise');

module.exports.extractTestData = function (html, filename) {
  let links = $('a', html);
  let linkRes = [];
  for (let i = 0; i < links.length; i++) {
    linkRes.push(links[i].attribs);
  }
  write(path.join(__dirname, filename),
    JSON.stringify(linkRes, null, 4));
};

module.exports.write = function (filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, err => {
      resolve(err)
    })
  });
};

module.exports.read = function (filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => (
      err ? reject(err) : resolve(data)
    ));
  });
};

module.exports.request = async function(url) {
  return new Promise((resolve, reject) => {
    requestPromise(url)
      .then(html => resolve(html))
      .catch(err => reject(err))
  })
};