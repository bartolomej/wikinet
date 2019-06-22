const GraphService = require('../src/services/GraphService');

test('construct graph', async () => {
  let graph = await GraphService.twoDegreeGraph(100);
  expect(graph).toEqual();
});