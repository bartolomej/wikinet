const GraphService = require('../src/services/GraphService');
const GraphDb = require('../src/db/GraphDb');
const config = require('../config').db;

describe('Graph service tests', function () {

  it('should compute caches', async () => {
    GraphDb.init(config);
    await GraphService.computeCache();
    let cache = await GraphService.getHighlyConnected();
    expect(cache).toEqual()
  });
});