const request = require('./utils').request;
const $ = require('cheerio');
const repo = require('./repository');
const ScrapeUtil = require('./utils');
const WikiPage = require('./WikiPage');
const colors = require('colors/safe');


async function scrapeAll(limit, infoCallback) {
  let pages = await repo.getNodesByDegrees(0);
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

async function depthFirstScrape(initialHref, degrees = 10) {
  let page = await repo.getPage(initialHref, degrees);
  console.log('degree: ', degrees);
  if (degrees <= 1) return Promise.resolve();
  if (page.edges.length > 0) {
    console.log('scraping page: ', page.edges[0]);
    let index = Math.floor(Math.random()*page.edges.length-1);
    try {
      await scrapePage(page.edges[index]);
      await depthFirstScrape(page.edges[index], degrees-1);
    } catch (e) {}
  }
}

async function scrapeFrom(initialHref, degrees, currentDegree = 0, limit) {
  let page = await repo.getNode(initialHref, limit);

  if (currentDegree >= degrees) return;
  for (let i = 0; i < page.edges.length; i++) {
    console.log(colors.green('edge: ' + page.edges[i]));
    try {
      let {links} = await scrapePage(page.edges[i]);
      console.log(colors.red('firstLink: ' + links[0] + ' degree: ' + currentDegree));
      links.forEach(link => scrapeFrom(link, limit, degrees, currentDegree + 1));
    } catch (e) {
      console.log('cannot be scraped: ' + page.edges[i]);
      console.log(e);
    }
  }
}

async function scrapePage(pageUrl) {
  let html = await request(pageUrl);
  let pageDetails = extractDetails(html);

  let page = new WikiPage(
    pageDetails.title,
    pageDetails.type,
    pageUrl
  );

  for (let i = 0; i < pageDetails.links.length; i++) {
    page.connections = [...page.connections,
      new WikiPage(
        pageDetails.links[i].title,
        pageDetails.links[i].type,
        pageDetails.links[i].url
      )
    ];
  }

  return await repo.savePage(page);
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
  scrapeFrom,
  scrapePage,
  scrapeAll,
  extractDetails,
  depthFirstScrape
};