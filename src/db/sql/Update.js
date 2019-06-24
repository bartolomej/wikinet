module.exports.updatePage = (uid, isScraped, description) => {
  return (
    `UPDATE page SET scraped = ${isScraped}, 
    description = '${description}' 
    WHERE uid = '${uid}'`
  );
};