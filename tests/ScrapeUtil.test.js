const ScrapeUtil = require('../src/ScrapeUtil');

describe('Scrape utils',  function () {

  it('should get page type based on title', function () {

  });

  it('should format title', function () {

  });

  it('should normalize title and generate uid', function () {
    let uid = ScrapeUtil.generateUid("Discovery (observation)");
    expect(uid).toEqual('5baaacc5-9132-33a0-8ebd-b8f48dce9014');
  });
});