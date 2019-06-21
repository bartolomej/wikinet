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

module.exports.getNeighborIds = (fromUid) => {
  return (
    `SELECT uid FROM page
     WHERE uid in (
     SELECT r.to_node
     FROM reference r
     WHERE r.from_node = '${fromUid}')`
  )
};