module.exports.updateScraped = (uid, isScraped) => {
  return `UPDATE page SET scraped = ${isScraped} WHERE uid = '${uid}'`;
};