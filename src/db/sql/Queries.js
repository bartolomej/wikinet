module.exports.getPage = href => {
  return `SELECT * FROM page where href = '${href}'`;
};

module.exports.getAllPages = (limit) => {
  return `SELECT * FROM page ${limit !== undefined ? `LIMIT ${limit}` : ''}`;
};

module.exports.getUnscrapedPages = (limit) => {
  return (
    `SELECT * FROM page p
    LEFT JOIN reference r
    ON r.from_node = p.href
    WHERE r.from_node is null
    ${limit !== undefined ? `LIMIT ${limit}` : ''}`
  );
};

/*
module.exports.getUnscrapedPages = (limit) => {
  return (
    `SELECT * FROM page p
    WHERE scraped is false
    ${limit !== undefined ? `LIMIT ${limit}` : ''}`
  );
};
*/

module.exports.getConnectionsStats = () => {
  return (
    `SELECT p.title, count(r.from_node) as connections 
    FROM page p
    INNER JOIN reference r 
    ON r.from_node = p.href
    GROUP BY from_node`
  )
};

module.exports.getNeighbors = (fromUid) => {
  return (
    `SELECT * FROM page
     WHERE href in (
     SELECT r.to_node
     FROM reference r
     WHERE r.from_node = '${fromUid}')`
  )
};

module.exports.getNeighborIds = (fromUid, limit) => {
  return (
    `SELECT r.to_node
     FROM reference r
     WHERE r.from_node = '${fromUid}' 
     ${limit === undefined ? '' : `LIMIT ${limit}`}`
  )
};

module.exports.getSecondDegreeNodes = limit => {
  return (
    `SELECT p1.*
     FROM page p1
     INNER JOIN reference r1
     ON p1.href = r1.from_node
     INNER JOIN page p2 
     ${limit === undefined ? '' : `LIMIT ${limit}`}`
  )
};

module.exports.getThirdDegreeNodes = limit => {
  return (
    `SELECT p1.title, p2.title, p3.title
     FROM page p1
     INNER JOIN reference r1
     ON p1.href = r1.from_node
     INNER JOIN page p2
     ON p2.href = r1.to_node
     INNER JOIN reference r2
     ON p2.href = r2.from_node
     INNER JOIN page p3 
     ${limit === undefined ? '' : `LIMIT ${limit}`}`
  )
};

module.exports.getMultiDegreeNodes = (degrees, limit = undefined, select = 'href') => {
  let query = 'SELECT ';

  for (let i = 0; i < degrees; i++) {
    query += `p${i}.${select}`;
    query += `${i === degrees -1 ? ' ' : ', '}`;
  }

  for (let i = 0; i < degrees; i++) {
    if (i === 0) query += `FROM page p0`;
    if (i > 0) {
      query += ` INNER JOIN page p${i} `;
      query += `ON p${i}.href = r${i-1}.to_node`;
    }
    if (i < degrees - 1 || degrees === 1) {
      query += ` INNER JOIN reference r${i} `;
      query += `ON p${i}.href = r${i}.from_node`;
    }
  }

  if (limit !== undefined) query += ` LIMIT ${limit}`;

  return query;
};

module.exports.getHighlyConnectedNodes = function () {
  return (
    `SELECT DISTINCT p1.href, p1.title
    FROM page p1
    INNER JOIN reference r1
    ON p1.href = r1.from_node
    INNER JOIN page p2
    ON p2.href = r1.to_node
    INNER JOIN reference r2
    ON p2.href = r2.from_node
    INNER JOIN page p3
    ON r2.to_node = p3.href`
  )
};