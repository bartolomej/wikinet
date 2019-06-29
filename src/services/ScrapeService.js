const request = require('../ScrapeUtil').request;
const $ = require('cheerio');
const repo = require('../db/GraphDb');
const ScrapeUtil = require('../ScrapeUtil');
const colors = require('colors/safe');
const GraphService = require('./GraphService');


async function scrapeAll(limit, infoCallback) {
  // TODO: add smarts (scrapeAll poorly connected pages,..)
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
  await cache();
}

async function depthFirstScrape(initialHref, degrees = 10) {
  let page = await repo.getNode(initialHref, degrees);
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
  await cache();
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
  await cache();
}

async function scrapePage(href) {
  let html;
  try {
    html = await request(href);
  } catch (e) {
    return Promise.resolve();
  }
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
      await repo.addPage({
        type: links[i].type,
        title: links[i].title,
        href: links[i].href,
        scraped: false, description: ''
      });
      console.log('adding link: ' + links[i].href);
      await repo.addEdge(href, links[i].href);
    } catch (e) {
      // DOUBLE_ENTRY ERROR
    }
  }
  return Promise.resolve(links);
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

async function cache() {
  await GraphService.computeHighlyConnected();
}

module.exports = {
  scrapeFrom,
  scrapePage,
  scrapeAll,
  extractDetails,
  depthFirstScrape
};