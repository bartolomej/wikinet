module.exports = class Node {

  constructor(uid, data) {
    this.uid = uid;
    this.data = data;
    this.edges = {};
    // TODO: add specific fields
  }

  addEdge(nodeUid) {
    if (!this.edges[nodeUid]) {
      this.edges[nodeUid] = 1;
    } else {
      this.edges[nodeUid]++;
    }
  }

  addEdges(nodeUids) {
    nodeUids.forEach(this.addEdge)
  }
  
};