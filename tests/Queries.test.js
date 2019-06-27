const {getMultiDegreeNodes} = require('../src/db/sql/Queries');

describe('Test queries generation', function () {

  it('should generate query for 1-degree graph', function () {
    let query = getMultiDegreeNodes(1, 10, 'title');
    expect(query).toEqual(
      'SELECT p0.title ' +
      'FROM page p0 ' +
      'INNER JOIN reference r0 ' +
      'ON p0.uid = r0.from_node ' +
      'LIMIT 10'
    )
  });

  it('should generate query for 2-degree graph', function () {
    let query = getMultiDegreeNodes(2, 10, 'title');
    expect(query).toEqual(
      'SELECT p0.title, p1.title ' +
      'FROM page p0 ' +
      'INNER JOIN reference r0 ' +
      'ON p0.uid = r0.from_node ' +
      'INNER JOIN page p1 ' +
      'ON p1.uid = r0.to_node ' +
      'LIMIT 10'
    )
  });

  it('should generate query for 3-degree graph', function () {
    let query = getMultiDegreeNodes(3, 10, 'title');
    expect(query).toEqual(
      'SELECT p0.title, p1.title, p2.title ' + '' +
      'FROM page p0 ' +
      'INNER JOIN reference r0 ' +
      'ON p0.uid = r0.from_node ' +
      'INNER JOIN page p1 '+
      'ON p1.uid = r0.to_node ' +
      'INNER JOIN reference r1 ' +
      'ON p1.uid = r1.from_node ' +
      'INNER JOIN page p2 '+
      'ON p2.uid = r1.to_node ' +
      'LIMIT 10'
    )
  });

});