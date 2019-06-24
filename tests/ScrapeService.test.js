const WikiScraper = require('../src/services/ScrapeService');
const {read} = require('./TestUtils');
const path = require('path');

describe('Scrape service tests', function () {

  it('should extract details from html webpage', async () => {
    let wikiPage1 = await read(path.join(__dirname, 'res/epistemology.wiki.htm'));
    let wikiPage2 = await read(path.join(__dirname, 'res/knowledge.wiki.htm'));

    let extracted1 = WikiScraper.extractDetails(wikiPage1);
    let extracted2 = WikiScraper.extractDetails(wikiPage2);

    expect(extracted1.title).toEqual('Epistemology');
    expect(extracted1.links.length).toEqual(1501);

    expect(extracted2.title).toEqual('Knowledge');
    expect(extracted2.links.length).toEqual(1056);
  });

  it('should scrape initial page twice', async () => {
    await WikiScraper.scrape('1');
  });

});