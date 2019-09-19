const request = require('./utils').request;
const $ = require('cheerio');
const repo = require('./repository');
const ScrapeUtil = require('./utils');
const WikiPage = require('./Page');


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

async function depthFirstScrape(initialUrl, degrees = 10) {
  let neighbors = await repo.getPageNeighbors(initialUrl);
  console.log(neighbors[0])
  if (degrees <= 1) return;
  if (neighbors.length > 0) {
    for (let i = 0; i < neighbors.length; i++) {
      try {
        await scrapePage(neighbors[i].url);
        console.log('SCRAPED PAGE: ', neighbors.edges[0].id);
        await depthFirstScrape(neighbors[index].url, degrees-1);
      } catch (e) {}
    }
  }
}

async function breathFirstScrape(url, degrees, currentDegree = 0) {
  let neighbors = await repo.getPageNeighbors(url);

  if (currentDegree >= degrees) return;
  for (let i = 0; i < neighbors.length; i++) {
    try {
      let {links} = await scrapePage(neighbors[i].url);
      console.log(`degree: ${currentDegree}, links: ${links.length}`);
      links.forEach(link => breathFirstScrape(link, degrees, currentDegree+1));
    } catch (e) {
      console.log('SCRAPE ERROR: ', e.message);
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
    let neighborPage = new WikiPage(
      pageDetails.links[i].title,
      pageDetails.links[i].type,
      pageDetails.links[i].url
    );
    page.connections[neighborPage.id] = neighborPage;
  }

  await repo.savePage(page);
  console.log('SCRAPED ', pageDetails.links.length, ' PAGES');

  return {
    links: pageDetails.links,
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
        url: ScrapeUtil.formatLink(attributes.href)
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
  breathFirstScrape,
  scrapePage,
  scrapeAll,
  extractDetails,
  depthFirstScrape
};