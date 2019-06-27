module.exports = class Node {

  constructor(href, type, title, endNode, description) {
    this.href = href;
    this.type = type;
    this.title = title;
    this.endNode = endNode;
    this.description = description;
    this.edges = [];
  }

  addEdge(nodeUid) {
    this.edges.push(nodeUid);
  }

  addEdges(nodeUids) {
    nodeUids.forEach(this.addEdge)
  }
  
};