const WikiScraper = require('../src/services/ScrapeService');

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