const Graph = require('../models/Graph');
const Node = require('../models/Node');
const repo = require('../../db/GraphDb');

module.exports.twoDegreeGraph = async function (limit) {
  let graph = [];

  let initialNode = await repo.getNode('1', limit);
  graph.push(initialNode);

  for (let i = 0; i < initialNode.edges.length; i++) {
    graph.push(await repo.getNode(initialNode.edges[i], limit));
  }

  return graph;
};

module.exports.graph = async function (initialNodeUid, degreeLimit, nodeLimit) {

};