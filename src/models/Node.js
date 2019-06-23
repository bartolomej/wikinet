module.exports = class Node {

  constructor(uid, data) {
    this.uid = uid;
    this.data = data;
    this.edges = [];
  }

  addEdge(nodeUid) {
    this.edges.push(nodeUid);
  }

  addEdges(nodeUids) {
    nodeUids.forEach(this.addEdge)
  }
  
};