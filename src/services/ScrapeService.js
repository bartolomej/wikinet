const rp = require('request-promise');
const $ = require('cheerio');
const repo = require('../../db/GraphDb');
const ScrapeUtil = require('../ScrapeUtil');
const UID = require('uuid');

const URL = 'https://en.wikipedia.org';

async function scrapeAll(limit) {
  let pages = await repo.getUnscraped(limit);

  for (let i = 0; i < pages.length; i++) {
    let uid = pages[i].uid;
    try {
      await scrape(uid);
      await repo.updateScraped(uid, true);
    } catch (e) {
      console.log(e);
    }
  }
}

async function scrape(uid) {
  let node = await repo.getNode(uid);
  let html = await request(URL + node.data.href);
  let {results} = extractResults(html);

  for (let i = 0; i < results.length; i++) {
    let entity = results[i];
    let uid = UID();
    try {
      await repo.addPage({
        uid,
        type: ScrapeUtil.getType(entity.title),
        title: ScrapeUtil.formatTitle(entity.title),
        href: entity.href,
        scraped: false,
        description: ''
      });
      await repo.addEdge(node.uid, uid);
    } catch (e) {
      console.log(e)
    }
  }
}

function extractResults(html) {
  let name = $('.firstHeading', html).text();
  let links = $('a', html);

  let results = [];
  for (let i = 0; i < links.length; i++) {
    let node = links[i];
    let attrib = node.attribs;
    if (
      attrib &&
      attrib.title &&
      attrib.href
    ) results.push({
      title: attrib.title,
      href: attrib.href
    })
  }

  return {name, results}
}

async function request(url) {
  return new Promise((resolve, reject) => {
    rp(url)
      .then(html => resolve(html))
      .catch(err => reject(err))
  })
}

module.exports = {
  request,
  scrape,
  extractResults,
  scrapeAll,
};