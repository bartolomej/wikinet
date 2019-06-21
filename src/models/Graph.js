module.exports = class Graph {

  /* GRAPH DEFINITION:
   * V = {0, 1, 2, 3}
   * E = {(0,1), (0,2), (0,3), (1,2)}
   * G = {V, E}
   */

  constructor() {
    this.nodes = {};
    this.edges = {};
  }

  addNode(node) {
    if (!this.nodes[node.uid]) {
      this.nodes[node.uid] = node;
    }
  }

  addEdge(fromUid, toUid) {
    if (!this.nodes[fromUid])
      throw new Error(`Node ${fromUid} doesn't exist`);
    this.nodes[fromUid].addEdge(toUid);
  }

  getById(uid) {
    return this.nodes[uid];
  }

  getStatistics() {
    let stats = {
      // TODO: implement graph stats
    };
    function traverse(nodes) {
      nodes.forEach(node => {

      })
    }
  }

  bfs(startNodeUid) {
    let edges = this.nodes[startNodeUid].edges;
    // TODO: implement graph traversal algorithms
    function traverse() {

    }
  }

};