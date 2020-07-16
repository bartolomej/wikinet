const UUID = require('uuid-by-string');
const fetch = require('node-fetch');
const colors = require('colors/safe');

String.prototype.splice = function (idx, rem, str) {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

module.exports.request = async function (url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(url => url.text())
      .then(body => resolve(body))
      .catch(reject);
  })
};

module.exports.getType = (title) => {
  if (/^.*Category/.test(title)) return 'category';
  if (/^.*book/.test(title)) return 'book';
  if (/^.*Talk:/.test(title)) return 'talk';
  if (/^.*File:/.test(title)) return 'file';
  if (/^.*Template:/.test(title)) return 'template';
  if (/^.*Wikipedia:/.test(title)) return 'wiki_article';
  else return 'article';
};

module.exports.formatTitle = (title) => {
  title = title.split(':')[0];
  let index = title.indexOf('\'');
  if (index > -1)
    return title.splice(index, 0, "'");
  else
    return title;
};

module.exports.formatLink = link => {
  if (!(/^https/.test(link)))
    link = 'https://en.wikipedia.org' + link;
  return link;
};

module.exports.generateUid = title => {
  const normalized = title
    .replace(" ", "")
    .toLowerCase();
  return UUID(normalized);
};

module.exports.logger = {
  success: msg => console.log(colors.green(msg)),
  error: msg => console.error(colors.red(msg)),
  info: msg => console.info(colors.blue(msg))
}
