const request = require('../ScrapeUtil').request;
const $ = require('cheerio');
const repo = require('../db/GraphDb');
const ScrapeUtil = require('../ScrapeUtil');


async function scrapeAll(limit, infoCallback) {
  // TODO: add smarts (scrape poorly connected pages,..)
  let pages = await repo.getUnscraped(limit);

  for (let i = 0; i < pages.length; i++) {
    let href = pages[i].href;
    console.log(`scraping: ${href}`);
    try {
      await scrapePage(href, limit);
      infoCallback(i, href);
    } catch (e) {
      console.log(e.message);
    }
  }
}

async function depthFirstScrape(initialNode) {

}

async function scrapeFrom(initialHref, limit) {
  let page = await repo.getNode(initialHref, limit);

  for (let i = 0; i < page.edges.length; i++) {
    console.log('edge: ' + page.edges[i]);
    try {
      await scrapePage(page.edges[i]);
    } catch (e) {
      console.log('cannot be scraped: ' + page.edges[i]);
    }

  }
}

async function scrapePage(href) {
  let html = await request(href);
  let {links, title, type} = extractDetails(html);

  try {
    await repo.addPage({
      type, title, href,
      scraped: false, description: ''
    });
  } catch (e) {
    console.log(`Page exists ${href}`)
  }

  for (let i = 0; i < links.length; i++) {
    try {
      console.log('adding link: ' + links[i].href);
      await repo.addPage({
        type: links[i].type,
        title: links[i].title,
        href: links[i].href,
        scraped: false, description: ''
      });
      await repo.addEdge(href, links[i].href);
    } catch (e) {
      console.log(e.message)
    }
  }
}

function extractDetails(html) {
  let title = $('.firstHeading', html).text();
  let type = ScrapeUtil.getType(title);
  let details = extractText(html)
    .replace("'", '')
    .replace('"', '');
  let linkData = $('a', html);
  let links = [];
  for (let i = 0; i < linkData.length; i++) {
    if (!linkData[i].hasOwnProperty("attribs")) continue;
    let attributes = linkData[i].attribs;
    if (attributes.title && attributes.href) {
      links.push({
        uid: ScrapeUtil.generateUid(title),
        title: ScrapeUtil.formatTitle(attributes.title),
        type: ScrapeUtil.getType(attributes.title),
        href: ScrapeUtil.formatLink(attributes.href)
      });
    }
  }
  return {title, details, links, type};
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
  scrapeFrom,
  scrapePage,
  scrapeAll,
  extractDetails
};