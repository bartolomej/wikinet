module.exports.addPage = (node) => {
  return (
    `INSERT INTO page (type, title, href, scraped, description, image) 
    VALUES ('${node.type}', '${node.title}', 
    '${node.href}', ${node.scraped}, '${node.description}', '${node.image}')`
  );
};

module.exports.addEdge = (hrefFrom, hrefTo) => {
  return (
    `INSERT INTO reference (from_node, to_node)
     VALUES ('${hrefFrom}', '${hrefTo}')`
  )
};
