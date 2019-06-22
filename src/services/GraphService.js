const Graph = require('../models/Graph');
const Node = require('../models/Node');
const repo = require('../../db/GraphDb');


async function firstDegreeGraph() {
  // TODO: load graph node by node
  let graph = new Graph();
  let firstNode = await repo.getNode('1');
  graph.addNode(firstNode);
  for (let uid in graph.edges) {
    graph.addNode(await repo.getNode(uid))
  }
  return graph;
}

async function fullGraph() {
  let graph = new Graph();
  let firstNode = await repo.getNode('1');
  await traverse(firstNode, 0);

  async function traverse(node, i) {
    let secondNode = await repo.getNode(node.uid);
    graph.addNode(secondNode);
    traverse(secondNode, i++);
  }
  return graph;
}

module.exports.twoDegreeGraph = async function (limit) {
  let graph = new Graph();
  let initialNode = await repo.getNode('1');
  graph.addNode(initialNode);
  return graph;
};