const GraphDB = require('../db/graph');

module.exports.twoDegreeGraph = async function (initialNodeHref, limit) {
  let graph = [];

  let initialNode = await GraphDB.getNode(initialNodeHref, limit);
  graph.push(initialNode);

  for (let i = 0; i < initialNode.edges.length; i++) {
    let firstNode = await GraphDB.getNode(initialNode.edges[i], limit);
    graph.push(firstNode);
    for (let j = 0; j < firstNode.edges.length; j++) {
      let secNode = await GraphDB.getNode(firstNode.edges[j], limit);
      graph.push(secNode);
      for (let z = 0; z < secNode.edges.length; z++) {
        let thirdNode = await GraphDB.getNode(secNode.edges[z], limit);
        graph.push(thirdNode);
        for (let g = 0; g < thirdNode.edges.length; g++) {
          let forthNode = await GraphDB.getNode(thirdNode.edges[g], limit);
          firstNode.edges = [];
          graph.push(forthNode);
          for (let t = 0; t < forthNode.edges.length; t++) {
            let fifthNode = await GraphDB.getNode(forthNode.edges[t], limit);
            fifthNode.edges = [];
            graph.push(fifthNode);
            console.log('fifth degree node: ' + fifthNode.href);
          }
        }
      }
    }
  }

  return graph;
};

module.exports.graph = async function (initialNodeUid, degreeLimit, nodeLimit) {
  let graph = [];
  let initial = await GraphDB.getNode(initialNodeUid, nodeLimit);

  async function construct (node, edge) {
    let neighbors = [];

    let nextNode = await GraphDB.getNode(node.edges[edge], nodeLimit);
    nextNode.edges.forEach(edge => {
      neighbors.push()
    })

  }
};

module.exports.getHighlyConnected = async function () {
  return await GraphDB.getHighlyScrapedNodes();
};