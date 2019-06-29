const CacheDb = require('../src/db/FileDb');

describe('Cache writes / reads', function () {

  it('should write to cache folder', async function () {
    await CacheDb.write('test.cache', {testKey: 'testValue'});
    let actualValue = await CacheDb.read('test.cache');
    expect(actualValue).toEqual({testKey: 'testValue'});

    await CacheDb.remove('test.cache');
  });

});