module.exports = class Graph {

  /* GRAPH DEFINITION:
   * V = {0, 1, 2, 3}
   * E = {(0,1), (0,2), (0,3), (1,2)}
   * G = {V, E}
   */

  constructor () {
    this.nodes = {};
    this.edges = {};
    this.degrees = {};
  }

  addNode (node) {
    if (!this.nodes[node.uid]) {
      this.nodes[node.uid] = node;
    }
  }

  addNodes (nodes) {
    nodes.forEach(this.addNode);
  }

  addNodesForDegree (degree, nodes) {
    this.degrees[degree] = [];
    nodes.forEach(node => {
      this.degrees[degree].push(node.uid);
      this.nodes.push(node);
    })
  }

  addEdge (fromUid, toUid) {
    if (!this.nodes[fromUid])
      throw new Error(`Node ${fromUid} doesn't exist`);
    this.nodes[fromUid].addEdge(toUid);
  }

  getFirstDegreeUids () {
    return this.degrees[1];
  }

  getById (uid) {
    return this.nodes[uid];
  }

  bfs (startNodeUid) {
    let edges = this.nodes[startNodeUid].edges;

    // TODO: implement graph traversal algorithms
    function traverse () {

    }
  }

};