const Node = require('../models/Node');
const {query} = require('./DbFactory');
const Queries = require('./sql/Queries');
const Inserts = require('./sql/Inserts');
const Update = require('./sql/Update');
const Delete = require('./sql/Delete');


async function getNode(uid, edgeLimit) {
  let node = deserialize(await getPage(uid));
  let neighbors = await getNeighborIds(uid, edgeLimit);
  neighbors.forEach(row => node.addEdge(row.to_node));
  return node;
}

async function getAllNodes(limit) {
  let pages = await getAllPages(limit);
  let nodes = pages.map(deserialize);
  return Promise.all(nodes.map(async node => {
    let neighbors = await getNeighborIds(node.uid, limit);
    neighbors.forEach(e => node.addEdge(e.to_node));
    return node;
  }));
}

async function getNodes(uids) {
  return Promise.all(uids.map(async uid => await getNode(uid)));
}

async function getAllPages(limit) {
  return await query(Queries.getAllPages(limit));
}

async function getSecondDegreeNodes(limit) {
  let nodes = await query(Queries.getSecondDegreeNodes(limit));
  return nodes.map(deserialize);
}

async function addPage(node) {
  await query(Inserts.addPage(node));
}

async function updatePage(uid, scraped, description) {
  await query(Update.updatePage(uid, scraped, description));
}

async function addEdge(uidFrom, uidTo) {
  await query(Inserts.addEdge(uidFrom, uidTo));
}

async function getPage(uid) {
  let results = await query(Queries.getPage(uid));
  if (results.length < 1)
    return Promise.reject(new Error('Page not found with uid ' + uid));
  return Promise.resolve(results[0]);
}

async function getUnscraped(limit) {
  return await query(Queries.getUnscrapedPages(limit));
}

async function getConnectionStats() {
  return await query(Queries.getConnectionsStats());
}

async function getNeighbors(uid) {
  return await query(Queries.getNeighbors(uid));
}

async function getNeighborIds(uid, limit) {
  return await query(Queries.getNeighborIds(uid, limit));
}

async function removeAllPages() {
  await query(Delete.deleteAllPages());
}

async function removeAllReferences() {
  await query(Delete.deleteAllReferences());
}

async function removePage(uid) {
  await query(Delete.deletePage(uid));
}

function serialize(node) {
  return {
    uid: node.uid,
    type: node.data.type,
    title: node.data.title,
    href: node.data.href,
    scraped: !node.data.endNode,
    description: node.data.description
  }
}

function deserialize(node) {
  return new Node(node.uid, {
    type: node.type,
    title: node.title,
    href: node.href,
    endNode: !node.scraped,
    description: node.description
  })
}

module.exports = {
  getNode,
  getNodes,
  addPage,
  addEdge,
  getUnscraped,
  getSecondDegreeNodes,
  updatePage,
  getAllNodes,
  getAllPages,
  getNeighbors,
  getNeighborIds,
  removePage,
  removeAllPages,
  getConnectionStats,
  removeAllReferences,
  serialize,
  deserialize
};