const request = require('../ScrapeUtil').request;
const $ = require('cheerio');
const repo = require('../db/GraphDb');
const ScrapeUtil = require('../ScrapeUtil');

const URL = 'https://en.wikipedia.org';

async function scrapeAll(limit, infoCallback) {
  // TODO: add smarts (scrape poorly connected pages,..)
  let pages = await repo.getUnscraped(limit);

  for (let i = 0; i < pages.length; i++) {
    let uid = pages[i].uid;
    try {
      await scrape(uid);
      infoCallback(i, uid);
    } catch (e) {
      console.log(e.message);
    }
  }
}

async function scrape(uid) {
  let node = await repo.getNode(uid);
  let html = await request(URL + node.data.href);
  let {details, links} = extractDetails(html);
  await repo.updatePage(uid, true, '');

  for (let i = 0; i < links.length; i++) {
    let {uid, title, type, href} = links[i];
    try {
      await repo.addPage({
        uid, type, title, href,
        scraped: false, description: ''
      });
      await repo.addEdge(node.uid, uid);
    } catch (e) {
      console.log(e)
    }
  }
}

function extractDetails(html) {
  let title = $('.firstHeading', html).text();
  let details = extractText(html)
    .replace("'", '')
    .replace('"', '');
  let linkData = $('a', html);
  let links = [];
  for (let i = 0; i < linkData.length; i++) {
    if (!linkData[i].hasOwnProperty("attribs")) continue;
    let attributes = linkData[i].attribs;
    if (attributes.title && attributes.href) {
      let title = ScrapeUtil.formatTitle(attributes.title);
      let type = ScrapeUtil.getType(attributes.title);
      let href = ScrapeUtil.formatLink(attributes.href);
      let uid = ScrapeUtil.generateUid(title);
      links.push({uid, title, type, href});
    }
  }
  return {title, details, links};
}

function extractText(html) {
  return parseText($('p', html), "", 0);

  function parseText(nodes, data, counter) {
    if (counter >= nodes.length) return data;
    if (nodes[counter].hasOwnProperty("children")) {
      data += parseText(nodes[counter].children, "", 0);
    }
    if (nodes[counter].type === 'text') {
      return parseText(nodes, data + nodes[counter].data, ++counter)
    } else {
      return parseText(nodes, data, ++counter)
    }
  }
}

module.exports = {
  request,
  scrape,
  scrapeAll,
  extractDetails
};