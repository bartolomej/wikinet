module.exports = class WikiPage {

  constructor(title, type, url, connections = []) {
    this.title = title;
    this.type = type;
    this.url = url;
    this.connections = connections
  }

  toString() {
    return this;
  }

};