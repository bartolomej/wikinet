const Graph = require('../src/models/Graph');
const Node = require('../src/models/Node');

test('construct a simple graph', async () => {
  let graph = new Graph();

  graph.addNode(new Node('1', 'dataTest1'));
  graph.addNode(new Node('2', 'dataTest2'));
  graph.addNode(new Node('3', 'dataTest3'));

  graph.addEdge('1', '2');
  graph.addEdge('1', '3');
  graph.addEdge('1', '2');

  expect(graph.nodes).toEqual({
    "1": {uid: '1', data: 'dataTest1', edges: {"2": 2, "3": 1}},
    "2": {uid: '2', data: 'dataTest2', edges: {}},
    "3": {uid: '3', data: 'dataTest3', edges: {}},
  });
});