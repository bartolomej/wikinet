const ScrapeUtil = require('../src/ScrapeUtil');

test('get page', async () => {
  expect(await ScrapeUtil.formatTitle("Plato's Cave")).toEqual("Plato''s Cave");
});