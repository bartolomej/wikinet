const mysql = require('mysql');
const Node = require('../models/Node');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'rootPass',
  database : 'wiki'
});

connection.connect();

async function getNode(uid) {
  let firstNode = deserialize(await getPage('1'));
  let neighbors = await getNeighborIds('1');
  neighbors.forEach(row => {
    firstNode.addEdge(row.uid)
  });
  return firstNode;
}

async function getAllNodes() {
  let pages = await getAllPages();
  let nodes = pages.map(deserialize);
  return nodes.map(async node => { // use forEach ?
    let neighbors = await getNeighborIds(node.uid);
    neighbors.forEach(node => {
      node.addEdge(node.uid);
    })
  })
}

async function getAllPages() {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM page`, (error, results) => {
      if (error) return reject(error);
      return resolve(results);
    });
  })
}

async function addPage(node) {
  return new Promise((resolve, reject) => {
    const queryString =
      `INSERT INTO page (uid, type, title, href, scraped, description) 
      VALUES ('${node.uid}', '${node.type}', '${node.title}', 
      '${node.href}', ${node.scraped}, '${node.description}')`;
    connection.query(queryString, (error, results) => (
        error ? reject(error) : resolve(results)
      ));
  })
}

async function addEdge(uidFrom, uidTo) {
  return new Promise((resolve, reject) => {
    const queryString =
      `INSERT INTO reference (from_node, to_node)
      VALUES ('${uidFrom}', '${uidTo}')`;
    connection.query(queryString, (error, results) => {
      if (error) return reject(error);
      return resolve();
    });
  })
}

async function getPage(uid) {
  return new Promise((resolve, reject) => {
    const queryString =
      `SELECT * FROM page where uid = '${uid}'`;
    connection.query(queryString, (error, results) => {
      if (error) return reject(error);
      if (results.length < 1) return reject(new Error('Page not found with uid ' + uid));
      return resolve(results[0]);
    });
  })
}

async function getUnscraped(limit) {
  return new Promise((resolve, reject) => {
    const queryString =
      `SELECT * FROM page where scraped = false LIMIT ${limit}`;
    connection.query(queryString, (error, results) => (
      error ? reject(error) : resolve(results)
    ));
  })
}

async function updateScraped(uid, scraped) {
  return new Promise((resolve, reject) => {
    const queryString =
      `UPDATE page SET scraped = ${scraped} WHERE uid = '${uid}'`;
    connection.query(queryString, (error, results) => (
      error ? reject(error) : resolve(results)
    ));
  })
}

async function getNeighbors(uid) {
  return new Promise((resolve, reject) => {
    const queryString =
      `SELECT * FROM page
       WHERE uid in (
       SELECT r.to_node
       FROM reference r
       WHERE r.from_node = '${uid}')`;
    connection.query(queryString, (error, results) => (
        error ? reject(error) : resolve(results.map(deserialize))
      ));
  })
}

async function getNeighborIds(uid) {
  return new Promise((resolve, reject) => {
    const queryString =
      `SELECT uid FROM page
       WHERE uid in (
       SELECT r.to_node
       FROM reference r
       WHERE r.from_node = '${uid}')`;
    connection.query(queryString, (error, results) => (
      error ? reject(error) : resolve(results)
    ));
  })
}


async function removeAllPages() {
  return new Promise((resolve, reject) => {
    const queryString = `DELETE FROM page`;
    connection.query(queryString, (error, results) => (
      error ? reject(error) : resolve(results)
    ));
  })
}

async function removeAllReferences() {
  return new Promise((resolve, reject) => {
    const queryString = `DELETE FROM reference`;
    connection.query(queryString, (error, results) => (
      error ? reject(error) : resolve(results)
    ));
  })
}

async function removePage(uid) {
  return new Promise((resolve, reject) => {
    const queryString = `DELETE FROM page WHERE uid = '${uid}'`;
    connection.query(queryString, (error, results) => (
      error ? reject(error) : resolve(results)
    ));
  })
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
  addPage,
  addEdge,
  getUnscraped,
  updateScraped,
  getNeighbors,
  removePage,
  removeAllPages,
  removeAllReferences
};