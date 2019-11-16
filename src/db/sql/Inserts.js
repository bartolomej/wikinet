module.exports.addPage = (node) => {
  return (
    `INSERT INTO page (type, title, href, scraped) 
    VALUES ('${node.type}', '${node.title}', '${node.href}', ${node.scraped})`
  );
};

module.exports.addEdge = (hrefFrom, hrefTo) => {
  return (
    `INSERT INTO reference (from_node, to_node)
     VALUES ('${hrefFrom}', '${hrefTo}')`
  )
};
