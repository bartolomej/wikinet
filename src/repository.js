const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver(
  'bolt://localhost:7687',
  neo4j.auth.basic('neo4j', 'wiki')
);
let session = driver.session();
//initDb();

async function initDb() {
  await session
    .run(`
      CREATE CONSTRAINT ON (p:Page) 
      ASSERT p.id IS UNIQUE
    `)
}


module.exports.savePage = async (page) => {
  try {
    await session
      .run(`CREATE (:Page {
      id: '${page.id}',
      title: '${page.title}',
      type: '${page.type}',
      url: '${page.url}'
    })`);
  } catch (e) {
    console.log(e);
  }
  for (let id in page.connections) {
    const neighborPage = page.connections[id];
    try {
      await session
        .run(`CREATE (:Page {
          id: '${neighborPage.id}',
          title: '${neighborPage.title}',
          type: '${neighborPage.type}',
          url: '${neighborPage.url}'
        })`);
      await session
        .run(`
          MATCH (from:Page {id: '${page.id}'}), 
                (to:Page {id: '${neighborPage.id}'}) 
          CREATE (from) - [:REFERENCES] -> (to)`
        );
    } catch (e) {
      console.log(e.message);
    }
  }
};

module.exports.getPages = async (limit) => {
  return deserialize(await session
    .run(`
      MATCH(n:Page) 
      RETURN n ${limit ? 'LIMIT ' + limit : ''}
    `));
};

module.exports.getPage = async (id) => {
  return await session
    .run(`
      MATCH (n) 
      WHERE n.id = '${id}'
      RETURN n
    `);
}

module.exports.getPageByUrl = async (url) => {
  return deserialize(await session
    .run(`
      MATCH (n) 
      WHERE n.url = '${url}'
      RETURN n
    `));
}

module.exports.getPageNeighbors = async (url, limit) => {
  return deserialize(await session
    .run(`
      MATCH (:Page {url: '${url}'})-[r]->(n:Page)
      RETURN n ${limit ? `LIMIT ${limit}` : ''}
    `));
}

module.exports.getGraph = async (limit, id) => {
  return deserializeGraph(await session
    .run(`
      ${id ? `START n = node(*) WHERE n.id = '${id}'` : ''}
      MATCH (n)-[r*]->(d)
      RETURN n, r, d ${limit ? 'LIMIT ' + limit : ''}
    `));
};

/**
 * Returns n pages with
 * corresponding degrees
 */
module.exports.getPagesDegrees = async (limit, asc = false) => {
  return deserializePagesWithDegrees(await session
    .run(`
       START n = node(*)
       MATCH (n)--(c)
       RETURN n, count(*) as connections
       ORDER BY connections ${asc ? 'ASC' : 'DESC'}
       ${limit ? 'LIMIT ' + limit : ''}
    `));
};

module.exports.removeAllData = async () => {
  return await session
    .run(`
       MATCH (n)
       DETACH DELETE n
    `);
};

module.exports.getDataInfo = async () => {
  let nodes = await session.run(`
    MATCH (n) RETURN count(*)
  `);
  let relationships = await session.run(`
    MATCH (n)-[r]->() RETURN COUNT(r)
  `);
  return {
    nodes: nodes.records[0]._fields[0].low,
    relationships: relationships.records[0]._fields[0].low,
  };
};

module.exports.getByCustomQuery = async (query) => {
  return await session.run(query);
}

function deserialize(pagesQuery) {
  return pagesQuery.records.map(ele => ele._fields[0].properties);
}

function deserializePagesWithDegrees(pagesQuery) {
  return pagesQuery.records.map(ele => ({
    ... ele._fields[0].properties,
    connections: ele._fields[1].low
  }));
}

function deserializeGraph(graphQuery) {
  return graphQuery.records.map(ele => ({
    from: ele._fields[0].properties,
    to: ele._fields[2].properties
  }));
}

/**
 * matches degrees
 MATCH (actor)-[:ACTED_IN]->(m:Movie)
 WITH actor, count(movie) as c, collect(m) as movies
 WHERE c>1
 UNWIND movies as movie
 RETURN actor {.name,num_m},movie{.title}
 */