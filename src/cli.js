#!/usr/cli/env node

const program = require('commander');
const manifest = require('../package.json');
const graphRepo = require('./repository');
const scrapeService = require('./scrapeService');


program
  .version(manifest.version)
  .option('-ls <id>', 'List single page record.')
  .option('-lm <limit>', 'List multiple pages.')
  .option('-ss <url>', 'Scrape and save all links from <url>.')
  .option('-sm <url>', 'Scrape and save multiple pages starting from <url>.')
  .option('-di', 'Display records and relationship info.')
  .option('-dr', 'Remove all records from a database.');

program.on('--help', function() {
  console.log('');
  console.log('Examples:');
  console.log('');
  /**
   * TODO: update examples
   */
});

program
  .command('list:single <id>')
  .alias('ls')
  .action(async (id) => {
    let page = await graphRepo.getPage(id);
    console.log(page);
    process.exit(1);
  });

program
  .command('list:multi <limit>')
  .alias('lm')
  .action(async (limit) => {
    console.log(limit);
  });

program
  .command('scrape:single <url>')
  .alias('ss')
  .action(async (url) => {
    try {
      await scrapeService.scrapePage(url);
      console.log('WORK FINISHED 😀');
      process.exit(1);
    } catch (e) {
      console.log(e.name, e.message);
      console.log('ERROR OCCURRED ☹️');
      process.exit(1);
    }
  });

program
  .command('scrape:multi <initial-url>')
  .alias('sm')
  .option("--bfs <num>", 'Pass depth, default 10') // breath-first
  .option("--dfs <num>", 'Pass initial node') // depth-first
  .option("--limit <num>", 'Limit number of nodes per degree')
  .action(async (initialUrl) => {
    await scrapeService.breathFirstScrape(initialUrl, 3);
    console.log('SCRAPING FINISHED 😀');
    process.exit(0);
  });

program
  .command('data:remove')
  .alias('dr')
  .action(async () => {
    await graphRepo.removeAllData();
    console.log('DATA REMOVED 😀');
    process.exit(1);
  });

program
  .command('data:info')
  .alias('di')
  .action(async () => {
    let info = await graphRepo.getDataInfo();
    console.log(info);
  });

program.on('command:*', function () {
  console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
  process.exit(1);
});

program.parse(process.argv);