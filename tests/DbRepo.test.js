const DbRepo = require('../db/GraphDb');
const uid = require('uuid');

test('insert first page', async () => {
  const firstPage = {
    uid: '2',
    data: {
      type: 'article',
      title: 'Epistemology',
      href: '/wiki/Epistemology',
      endNode: true,
      description: ''
    }
  };
  await DbRepo.addPage(firstPage);

  expect(await DbRepo.getPage('2')).toEqual({
    uid: '2',
    data: {
      type: 'article',
      title: 'Epistemology',
      href: '/wiki/Epistemology',
      endNode: true,
      description: ''
    },
    edges: {}
  });

  DbRepo.removePage('2');
});

test('get page', async () => {
  expect(await DbRepo.getPage('479cc36c-aeb9-439b-830b-972b5fedef92')).toBe();
});

test('get unscraped', async () => {
  expect(await DbRepo.getUnscraped(3)).toBe();
});

test('update scraped', async () => {
  expect(await DbRepo.updateScraped('479cc36c-aeb9-439b-830b-972b5fedef92', true)).toBe();
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