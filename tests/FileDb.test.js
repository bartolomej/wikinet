const FileDb = require('../src/db/FileDb');

describe('FileDb tests', function () {

  it('should write json file', async () => {
    const TEST_DATA = {k: 'data'};

    await FileDb.write('cache.test', TEST_DATA);
    let fileData = await FileDb.read('cache.test');

    expect(fileData).toEqual(TEST_DATA)
  });

});