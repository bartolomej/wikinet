#!/usr/bin/env node

const program = require('commander');
const display = require('./bridge');
const version = require('../package.json').version;

program.version(version);

program.on('--help', function() {
  console.log('');
  console.log('Examples:');
  console.log('');
  console.log('  wiki-knowledge-graph pages --unscraped --limit 100');
  console.log('  wiki-knowledge-graph stats');
  console.log('');
});

program
  .command('pages')
  .alias('p')
  .option("--limit <num>", 'Limit pages')
  .option("--unscraped", 'Limit unscraped pages')
  .action((env) => {
    if (env.unscraped) {
      display.listUnscraped(env.limit);
    } else {
      display.listPages(env.limit)
    }
  });

program
  .command('scrape')
  .alias('s')
  .option("--limit <num>", 'Limit scraping pages')
  .action((env) => {
    display.scrape(env.limit)
  });

program
  .command('stats')
  .alias('s')
  .action((env) => {
    display.connectionStats()
  });

program.parse(process.argv);