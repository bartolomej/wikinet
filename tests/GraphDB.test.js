const DbRepo = require('../db/GraphDb');
const uid = require('uuid');

test('insert first page', async () => {
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

test('get pages', async () => {
  let pages = await DbRepo.getAllPages(10);
  let deserialized = pages.map(DbRepo.deserialize);
  expect(deserialized).toBe();
});

test('get neighbor', async () => {
  let uid = '00005481-1b2c-4e60-8396-4b3e57c637e9';
  let neighbor = await DbRepo.getNeighborIds(uid);
  expect(neighbor).toBe();
});

test('get nodes', async () => {
  let nodes = await DbRepo.getAllNodes(10);
  expect(nodes).toBe();
});