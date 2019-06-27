const DbRepo = require('../src/db/GraphDb');

const testConfig = {
  host     : 'localhost',
  user     : 'root',
  password : 'rootPass',
  database : 'wiki'
};


describe('Graph database updates and queries', function () {

  it('should insert new page', async () => {
    DbRepo.init(testConfig);
    const firstPage = {
      uid: '1111111',
      data: {
        type: 'article',
        title: 'Epistemology',
        href: '/wiki/Epistemology',
        endNode: true,
        description: ''
      }
    };
    await DbRepo.addPage(firstPage);

    expect(await DbRepo.getPage('1111111')).toEqual({
      uid: '1111111',
      data: {
        type: 'article',
        title: 'Epistemology',
        href: '/wiki/Epistemology',
        endNode: true,
        description: ''
      },
      edges: {}
    });

    DbRepo.removePage('1111111');
  });

});

describe('Graph database queries on test data', function () {

  it('should return initial node edges', async () => {
    DbRepo.init('wiki_test');
    let edges = await DbRepo.getNeighborIds('1');
    expect(edges).toEqual([
      {to_node: '2'},
      {to_node: '3'},
      {to_node: '4'},
      {to_node: '5'},
      {to_node: '6'},
      {to_node: '7'},
    ]);
  });

  it('should return initial node', async () => {
    DbRepo.init('wiki_test');
    let node = await DbRepo.getNode('1');
    expect(node).toEqual({
      uid: '1',
      data: {
        title: 'First page',
        type: 'page',
        description: 'Initial node',
        href: '',
        endNode: false
      },
      edges: [
        '2',
        '3',
        '4',
        '5',
        '6',
        '7'
      ]
    });
  });

  it('should return empty neighbors', async () => {
    DbRepo.init('wiki_test');
    let edges = await DbRepo.getNeighborIds('10');
    expect(edges).toEqual([])
  });

  it('should return 2 nodes', async () => {
    DbRepo.init('wiki_test');
    let nodes = await DbRepo.getAllNodes(2);
    expect(nodes).toEqual([
      {
        uid: '1',
        data: {
          title: 'First page',
          type: 'page',
          description: 'Initial node',
          href: '',
          endNode: false
        },
        edges: ['2', '3', '4', '5', '6', '7']
      },
      {
        uid: '10',
        data: {
          title: 'Tenth page',
          type: 'page',
          description: 'Second degree',
          href: '',
          endNode: false
        },
        edges: []
      }
    ])
  });

  it('should return 2 nodes by uids', async () => {
    DbRepo.init('wiki_test');
    let nodes = await DbRepo.getNodes(['1', '10']);
    expect(nodes).toEqual([
      {
        uid: '1',
        data: {
          title: 'First page',
          type: 'page',
          description: 'Initial node',
          href: '',
          endNode: false
        },
        edges: ['2', '3', '4', '5', '6', '7']
      },
      {
        uid: '10',
        data: {
          title: 'Tenth page',
          type: 'page',
          description: 'Second degree',
          href: '',
          endNode: false
        },
        edges: []
      }
    ])
  });

  it('should return 2 degree graph connections', async () => {
    DbRepo.init(testConfig);
    let graph = await DbRepo.getMultiDegreeNodes(4, 10, 'title');

    expect(graph).toEqual()
  });

});


describe('Graph queries on real data', function () {

  it('should get initial page', async () => {
    DbRepo.init('wiki');
    let node = await DbRepo.getNode('1', 100);
    expect(node).toEqual([]);
  });

  it('should get nodes with limit', async () => {
    DbRepo.init('wiki');
    let nodes = await DbRepo.getAllNodes(100);
    expect(nodes).toEqual([]);
  });

  it('should construct first degree graph starting from initial node', async () => {
    DbRepo.init('wiki');
    let initialNode = await DbRepo.getNode('1', 100);
    let neighbors = await DbRepo.getNodes(initialNode.edges);
    expect(neighbors).toEqual();
  });

});