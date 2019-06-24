const DB = require('../src/db/GraphDb');
const ScrapeService = require('../src/services/ScrapeService');
const DbFactory = require('../src/db/DbFactory');
const dbConfig = require('../config').db;
require('colors');
const colors = require('colors/safe');

const init = () => DbFactory.init(dbConfig);

module.exports.listPages = async function (limit) {
  init();
  let pages = await DB.getAllPages(limit);
  pages.forEach(page => {
    console.log(colors.bold(page.title))
  });
};

module.exports.listUnscraped = async function (limit) {
  init();
  let pages = await DB.getUnscraped(limit);
  pages.forEach(page => {
    console.log(colors.bold(page.title))
  });
};

module.exports.connectionStats = async function () {
  init();
  let stats = await DB.getConnectionStats();
  stats.forEach(stat => {
    console.log(colors.red(stat.title), stat.connections)
  })
};

module.exports.scrape = async function (limit) {
  init();
  await ScrapeService.scrapeAll(limit, (currentPage, uid) => {
    let progress = (100 * currentPage) / limit;
    console.log(`Progress ${progress}%`.green);
  });
};