module.exports.getPage = uid => {
  return `SELECT * FROM page where uid = '${uid}'`;
};

module.exports.getAllPages = (limit) => {
  return `SELECT * FROM page ${limit !== undefined ? `LIMIT ${limit}` : ''}`;
};

module.exports.getUnscrapedPages = (limit) => {
  return `SELECT * FROM page where scraped = false LIMIT ${limit}`;
};

module.exports.getNeighbors = (fromUid) => {
  return (
    `SELECT * FROM page
     WHERE uid in (
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
     ON p1.uid = r1.from_node
     INNER JOIN page p2 
     ${limit === undefined ? '' : `LIMIT ${limit}`}`
  )
};

module.exports.getThirdDegreeNodes = limit => {
  return (
    `SELECT p1.title, p2.title, p3.title
     FROM page p1
     INNER JOIN reference r1
     ON p1.uid = r1.from_node
     INNER JOIN page p2
     ON p2.uid = r1.to_node
     INNER JOIN reference r2
     ON p2.uid = r2.from_node
     INNER JOIN page p3 
     ${limit === undefined ? '' : `LIMIT ${limit}`}`
  )
};

module.exports.getForthDegreeNodes = limit => {
  return (
    `SELECT p1.title, p2.title, p3.title
     FROM page p1
     INNER JOIN reference r1
     ON p1.uid = r1.from_node
     INNER JOIN page p2
     ON p2.uid = r1.to_node
     INNER JOIN reference r2
     ON p2.uid = r2.from_node
     INNER JOIN page p3
     ON r2.to_node = p3.uid
     INNER JOIN reference r3
     ON p3.uid = r3.from_node
     INNER JOIN page p4
     ON r3.to_node = p4.uid
     ${limit === undefined ? '' : `LIMIT ${limit}`}`
  )
};