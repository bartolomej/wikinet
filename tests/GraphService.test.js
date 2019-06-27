const GraphService = require('../src/services/GraphService');
const GraphDb = require('../src/db/GraphDb');
const config = require('../config').db;

describe('Graph service tests', function () {

  it('should compute caches', async () => {
    GraphDb.init(config);
    let cache = await GraphService.computeCache(1, 10);

    expect(cache).toEqual()
  });
});