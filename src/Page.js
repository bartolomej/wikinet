const crypto = require('crypto');


module.exports = class Page {

  constructor(title, type, url) {
    this.id = crypto.createHash('md5')
      .update(title.toLowerCase().replace(/ /g, '-')).digest('hex');
    this.title = title;
    this.type = type;
    this.url = url;
    this.connections = {}
  }

  toString() {
    return this;
  }

};