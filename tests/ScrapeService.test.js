const WikiScraper = require('../src/services/scrape');
const {read, request} = require('./TestUtils');
const path = require('path');

describe('Scrape service tests', function () {

  it('should extract details from html webpage', async () => {
    let wikiPage1 = await request('https://en.wikipedia.org/wiki/Epistemology');
    let wikiPage2 = await request('https://en.wikipedia.org/wiki/Knowledge');

    let extracted1 = WikiScraper.extractDetails(wikiPage1);
    let extracted2 = WikiScraper.extractDetails(wikiPage2);

    expect(extracted1.title).toEqual('Epistemology');
    expect(extracted1.links.length).toEqual(1501);

    expect(extracted2.title).toEqual('Knowledge');
    expect(extracted2.links.length).toEqual(1056);
  });

  it('should scrapeAll initial page twice', async () => {
    await WikiScraper.scrape('1');
  });

});