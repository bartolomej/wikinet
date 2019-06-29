#!/usr/bin/env node

const program = require('commander');
const display = require('./bridge');
const version = require('../package.json').version;

program.version(version);

program.on('--help', function() {
  console.log('');
  console.log('Examples:');
  console.log('');
  console.log('  node bin/cli.js scrape --link https://en.wikipedia.org/wiki/God');
  console.log('  node bin/cli.js breadh-first-scrape --initial https://en.wikipedia.org/wiki/God');
  console.log('  node bin/cli.js pages --limit 100 --unscraped');
});

program
  .command('pages')
  .alias('p')
  .option("--limit <num>", 'Limit pages')
  .option("--unscraped", 'Limit unscraped pages')
  .action(async (env) => {
    if (env.unscraped) {
      await display.listUnscraped(env.limit);
    } else {
      await display.listPages(env.limit)
    }
  });

program
  .command('scrape')
  .alias('s')
  .option("--limit <num>", 'Limit scraping pages')
  .option("--link <num>", 'Scrape by web link')
  .option("--all" , 'Scrape all unscraped')
  .action(async (env) => {
    if (env.hasOwnProperty('all')) {
      await display.scrapeAll(env.limit);
    } else if (env.hasOwnProperty('link')) {
      await display.scrapePage(env.link);
    }
  });

program
  .command('breadh-first-scrape')
  .alias('bfs')
  .option("--depth <num>", 'Pass depth, default 10')
  .option("--initial <num>", 'Pass initial node')
  .action(async env => {
    await display.breadhFirstScrape(env.initial, env.degrees);
  });

program
  .command('depth-first-scrape')
  .alias('dfs')
  .option("--depth <num>", 'Pass depth, default 10')
  .option("--initial <num>", 'Pass initial node')
  .action(async env => {
    await display.depthFirstScrape(env.initial, env.degrees);
  });

program
  .command('stats')
  .alias('s')
  .option("--link <num>", '')
  .option("--limit <num>", '')
  .option("--from")
  .option("--to")
  .action(async (env) => {
    if (env.hasOwnProperty('link') && env.hasOwnProperty('limit')) {
      if (env.hasOwnProperty('from')) {
        await display.connectionStats('from', env.limit, env.link);
      } else {
        await display.connectionStats('to', env.limit, env.link);
      }
    } else if (env.hasOwnProperty('link')) {
      if (env.hasOwnProperty('from')) {
        await display.connectionStats('from', undefined, env.link);
      } else {
        await display.connectionStats('to', undefined, env.link);
      }
    } else if (env.from) {
      await display.connectionStats('from');
    } else if (env.to) {
      await display.connectionStats('to');
    } else {
      console.log('No options found. Use --help');
    }
  });

program.parse(process.argv);