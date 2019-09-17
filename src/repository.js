const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver(
  'bolt://localhost:7687',
  neo4j.auth.basic('neo4j', 'wiki')
);
let session = driver.session();


module.exports.savePage = async (page) => {
  await session
    .run(`CREATE (:Page {
      id: '${page.id}',
      type: '${page.type}',
      url: '${page.url}',
      description: "${page.description}"
    })`);
  for (let i = 0; i < page.connections.length; i++) {
    const neighborPage = page.connections[i];
    await session
      .run(`CREATE (:Page {
        id: '${neighborPage.id}',
        type: '${neighborPage.type}',
        url: '${neighborPage.url}',
        description: "${neighborPage.description}"
      })`);
    await session
      .run(`
        MATCH (from:Page {id: '${page.id}'}), 
              (to:Page {id: '${neighborPage.id}'}) 
        CREATE (from) - [:FOLLOWS] -> (to)`
      );
  }
};

module.exports.getPages = async (limit) => {
  return await session
    .run(`
      MATCH(n:Page) 
      RETURN n LIMIT 25
    `);
};

module.exports.getPage = async (id) => {
  return await session
    .run(`
      MATCH (n) 
      WHERE n.id = '${id}'
      RETURN n
    `);
}

module.exports.getGraph = async (limit) => {
  return await session
    .run(`
      START n=node(*) 
      MATCH (n)-[r]->(m) 
      RETURN n,r,m ${limit ? `LIMIT ${limit}` : ''}
    `);
};

module.exports.getPagesByDegrees = async (degrees) => {
  return await session
    .run(`
      MATCH (n)
      WHERE size((n)--()) = ${limit}
      RETURN n
    `);
};

/**
 * Returns n pages with
 * corresponding degrees
 */
module.exports.getPagesDegrees = async (limit) => {
  return await session
    .run(`
       START n = node(*)
       MATCH (n)--(c)
       RETURN n, count(*) as connections
       ORDER BY connections DESC
       LIMIT 10
    `);
};

module.exports.removeAllData = async () => {
  return await session
    .run(`
       MATCH (n)
       DETACH DELETE n
    `);
};

/**
 * matches degrees
 MATCH (actor)-[:ACTED_IN]->(m:Movie)
 WITH actor, count(movie) as c, collect(m) as movies
 WHERE c>1
 UNWIND movies as movie
 RETURN actor {.name,num_m},movie{.title}
 */