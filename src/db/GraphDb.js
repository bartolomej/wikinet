const Node = require('../models/Node');
const Queries = require('./sql/Queries');
const Inserts = require('./sql/Inserts');
const Update = require('./sql/Update');
const Delete = require('./sql/Delete');
const mysql = require('mysql');
let connection;

function init(dbConfig) {
  connection = mysql.createConnection(dbConfig);
  connection.connect();
}

async function query(queryString, handler) {
  return new Promise((resolve, reject) => {
    if (handler === undefined) {
      connection.query(queryString, (error, results) => (
        error ? reject(error) : resolve(results)
      ));
    } else {
      connection.query(queryString, handler);
    }
  })
}


async function getNode(href, edgeLimit) {
  let node = deserialize(await getPage(href));
  let neighbors = await getNeighborIds(href, edgeLimit);
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

async function getMultiDegreeNodes(degrees, limit, select) {
  let test = await query(Queries.getMultiDegreeNodes(degrees, limit, select));
  return Promise.all(await query(
    await Queries.getMultiDegreeNodes(degrees, limit, select)))
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

async function getPage(href) {
  let results = await query(Queries.getPage(href));
  if (results.length < 1)
    return Promise.reject(new Error('Page not found with href ' + href));
  return Promise.resolve(results[0]);
}

async function getPages(degrees, limit) {
  return await query(Queries.getMultiDegreeNodes(degrees, limit));
}

async function getUnscraped(limit) {
  return await query(Queries.getUnscrapedPages(limit));
}

async function getConnectionStats(link, type, limit) {
  if (type === 'from') {
    return await query(Queries.getConnectionsFrom(link, limit));
  } else if (type === 'to') {
    return await query(Queries.getConnectionsTo(link, limit));
  }
}

async function getHighlyScrapedNodes() {
  return await query(Queries.getHighlyConnectedNodes());
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
    type: node.type,
    title: node.title,
    href: node.href,
    scraped: !node.endNode,
    description: node.description
  }
}

function deserialize(node) {
  return new Node(
    node.href,
    node.type,
    node.title,
    node.endNode,
    node.description
  )
}

module.exports = {
  init,
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
  getHighlyScrapedNodes,
  serialize,
  deserialize,
  getMultiDegreeNodes
};