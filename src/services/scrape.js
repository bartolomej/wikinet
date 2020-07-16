const request = require('../utils').request;
const $ = require('cheerio');
const repo = require('../db/graph');
const utils = require('../utils');

async function scheduleScrape (url) {
  await scrapePage(url, 500);
  await scrapeFrom(url, 3);
}

async function scrapeAll (limit, infoCallback) {
  // TODO: add smarts (scrapeAll poorly connected pages,..)
  let pages = await repo.getUnscraped(limit);

  for (let i = 0; i < pages.length; i++) {
    let href = pages[i].href;
    utils.logger.info(`scraping: ${href}`);
    try {
      await scrapePage(href, limit);
      infoCallback(i, href);
    } catch (e) {
      utils.logger.error(e.message);
    }
  }
}

async function depthFirstScrape (initialHref, degrees = 10) {
  let page = await repo.getNode(initialHref, degrees);
  if (degrees <= 1) return Promise.resolve();
  if (page.edges.length > 0) {
    utils.logger.info('scraping page: ' + page.edges[0]);
    let index = Math.floor(Math.random() * page.edges.length - 1);
    try {
      await scrapePage(page.edges[index]);
      await depthFirstScrape(page.edges[index], degrees - 1);
    } catch (e) {
    }
  }
}

async function scrapeFrom (initialHref, degrees, currentDegree = 0, limit) {
  let page = await repo.getNode(initialHref, limit);

  if (currentDegree >= degrees) return;
  for (let i = 0; i < page.edges.length; i++) {
    utils.logger.info('edge: ' + page.edges[i]);
    try {
      let { links } = await scrapePage(page.edges[i], 30);
      links.forEach(link => scrapeFrom(link, degrees, currentDegree + 1, limit));
    } catch (e) {
      utils.logger.error(`scraping page ${page.edges[i]} failed: ${e.message}`);
    }
  }
}

async function scrapePage (href, resolveAfter) {
  let html;
  try {
    html = await request(href);
  } catch (e) {
    utils.logger.error(`FAILED TO FETCH: ` + e.message);
    throw e;
  }
  let { links, title, type } = extractDetails(html);

  try {
    await repo.addPage({
      type,
      title,
      href,
      scraped: false
    });
  } catch (e) {
    if (/ER_DUP_ENTRY/.test(e.message)) {
      utils.logger.error(`Page '${href}' already exists`);
    } else {
      utils.logger.error(`Unknown DB error: ${e}`);
    }
  }

  for (let i = 0; i < links.length; i++) {
    if (i >= resolveAfter) break;
    try {
      await repo.addPage({
        type: links[i].type,
        title: links[i].title,
        href: links[i].href,
        scraped: false, description: ''
      });
      await repo.addEdge(href, links[i].href);
      utils.logger.info(`added link ${i}: ` + links[i].href);
    } catch (e) {
      // do not log: double db entry error
    }
  }
  return Promise.resolve(links);
}

function extractDetails (html) {
  let title = $('.firstHeading', html).text();
  let type = utils.getType(title);
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
        uid: utils.generateUid(title),
        title: utils.formatTitle(attributes.title),
        type: utils.getType(attributes.title),
        href: utils.formatLink(attributes.href)
      });
    }
  }
  return { title, details, links, type };
}

function extractText (html) {
  return parseText($('p', html), "", 0);

  function parseText (nodes, data, counter) {
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
  scrapeFrom,
  scrapePage,
  scrapeAll,
  extractDetails,
  depthFirstScrape,
  scheduleScrape,
};
