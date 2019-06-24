const Graph = require('../models/Graph');
const Node = require('../models/Node');
const repo = require('../db/GraphDb');

module.exports.twoDegreeGraph = async function (limit) {
  let graph = [];

  let initialNode = await repo.getNode('1', limit);
  graph.push(initialNode);

  for (let i = 0; i < initialNode.edges.length; i++) {
    let firstNode = await repo.getNode(initialNode.edges[i], limit);
    for (let j = 0; j < firstNode.edges.length; j++) {
      let secNode = await repo.getNode(firstNode.edges[j], limit);
      secNode.edges = [];
      graph.push(secNode);
    }
    graph.push(firstNode);
  }

  return graph;
};

module.exports.graph = async function (initialNodeUid, degreeLimit, nodeLimit) {
  let graph = [];
  let initial = await repo.getNode(initialNodeUid, nodeLimit);

  async function construct(node, edge) {
    let neighbors = [];

    let nextNode = await repo.getNode(node.edges[edge], nodeLimit);
    nextNode.edges.forEach(edge => {
      neighbors.push()
    })

  }
};