module.exports.deletePage = (uid) => {
  return `DELETE FROM page WHERE uid = '${uid}'`;
};

module.exports.deleteAllPages = () => {
  return `DELETE FROM page`;
};

module.exports.deleteAllReferences = () => {
  return `DELETE FROM reference`;
};