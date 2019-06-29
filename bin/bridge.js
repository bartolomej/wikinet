const DB = require('../src/db/GraphDb');
const ScrapeService = require('../src/services/ScrapeService');
const GraphDb = require('../src/db/GraphDb');
const dbConfig = require('../config').db;
require('colors');
const colors = require('colors/safe');


const init = () => GraphDb.init(dbConfig);

module.exports.listPages = async function (limit) {
  init();
  let pages = await DB.getAllPages(limit);
  pages.forEach(page => {
    console.log(colors.bold(page.title))
  });
  return Promise.resolve();
};

module.exports.listUnscraped = async function (limit) {
  init();
  let pages = await DB.getUnscraped(limit);
  pages.forEach(page => {
    console.log(colors.bold(page.title))
  });
  return Promise.resolve();
};

module.exports.connectionStats = async function (fromOrTo, limit, link) {
  init();
  let stats = await DB.getConnectionStats(link, fromOrTo, limit);
  stats.forEach(stat => {
    console.log(colors.red(stat.title), stat.connections)
  });
  return Promise.resolve();
};

module.exports.scrapeAll = async function (limit) {
  init();
  await ScrapeService.scrapeAll(limit, (currentPage, uid) => {
    let progress = (100 * currentPage) / limit;
    console.log(`Progress ${progress}%`.green);
  });
  return Promise.resolve();
};

module.exports.scrapePage = async function (href) {
  init();
  await ScrapeService.scrapePage(href);
  return Promise.resolve();
};

module.exports.breadhFirstScrape = async function (href, degrees) {
  init();
  await ScrapeService.scrapeFrom(href, degrees);
  return Promise.resolve();
};

module.exports.depthFirstScrape = async function (href, degrees) {
  init();
  await ScrapeService.depthFirstScrape(href, degrees);
  return Promise.resolve();
};