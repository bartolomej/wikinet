const ScrapeUtil = require('../src/ScrapeUtil');

describe('Scrape utils',  function () {

  it('should get page type based on title', function () {

  });

  it('should format title', function () {

  });

  it('should normalize title and generate uid', function () {
    let uid1 = ScrapeUtil.generateUid("Discovery (observation)");
    let uid2 = ScrapeUtil.generateUid("Epistemology");
    expect(uid1).toEqual('5baaacc5-9132-33a0-8ebd-b8f48dce9014');
    expect(uid1 === uid2).toEqual(false);
  });
});