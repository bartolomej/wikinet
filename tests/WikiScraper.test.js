const WikiScraper = require('../src/WikiScraper');

test('scrape all', async () => {
  jest.setTimeout(3000000);
  let res = await WikiScraper.scrapeAll(10000);
  expect(res).toBe()
});

test('scrape by id', async () => {
  jest.setTimeout(300000);
  let res = await WikiScraper.scrape('1');
  expect(res).toBe()
});

test('construct graph', async () => {
  jest.setTimeout(300000);
  let graph = await WikiScraper.firstDegreeGraph();
  expect(graph).toEqual();
});

test('construct graph with recursion traversal', async () => {
  jest.setTimeout(300000);
  let graph = await WikiScraper.fullGraph();
  expect(graph).toEqual();
});