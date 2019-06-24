module.exports.addPage = (node) => {
  return (
    `INSERT INTO page (uid, type, title, href, scraped, description) 
    VALUES ('${node.uid}', '${node.type}', '${node.title}', 
    '${node.href}', ${node.scraped}, '${node.description}')`
  );
};

module.exports.addEdge = (uidFrom, uidTo) => {
  return (
    `INSERT INTO reference (from_node, to_node)
     VALUES ('${uidFrom}', '${uidTo}')`
  )
};
