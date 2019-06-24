const WikiScraper = require('../src/services/ScrapeService');
const fs = require('fs');
const path = require('path');

describe('Scrape service tests', function () {

  it('should extract details from html webpage', async () => {
    let wikiPage1 = await read(path.join(__dirname, 'res/epistemology.wiki.htm'));
    let wikiPage2 = await read(path.join(__dirname, 'res/knowledge.wiki.htm'));

    let extracted1 = WikiScraper.extractDetails(wikiPage1);
    let extracted2 = WikiScraper.extractDetails(wikiPage2);

    expect(extracted1).toEqual({
      title: 'Epistemology',
      details: [],
      links: []
    });

    expect(extracted2).toEqual({
      title: 'Knowledge',
      details: [],
      links: []
    })
  });

  it('should scrape initial page twice', async () => {
    await WikiScraper.scrape('1');
  });

});

function read(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => (
      err ? reject(err) : resolve(data)
    ));
  });
}