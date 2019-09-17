#!/usr/cli/env node

const program = require('commander');
const manifest = require('../package.json');
const graphRepo = require('./repository');
const scrapeService = require('./scrapeService');


program
  .version(manifest.version)
  .option('-C, --chdir <path>', 'change the working directory')
  .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
  .option('-T, --no-tests', 'ignore test hook');

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
  });

program
  .command('list:multi')
  .alias('lm')
  .action(async (env) => {
    console.log(env);
  });

program
  .command('scrape:single <url>')
  .alias('ss')
  .action(async (url) => {
    try {
      await scrapeService.scrapePage(url);
      console.log('WORK FINISHED 😀');
    } catch (e) {
      console.log(e.name, e.message);
      console.log('ERROR OCCURRED ☹️');
    }
  });

program
  .command('scrape:multi')
  .alias('sm')
  .option("--bfs <num>", 'Pass depth, default 10') // breath-first
  .option("--dfs <num>", 'Pass initial node') // depth-first
  .action(async env => {
    console.log(env);
  });

program
  .command('data:remove')
  .alias('dr')
  .action(async () => {
    await graphRepo.removeAllData();
    console.log('DATA REMOVED 😀');
  });

program
  .command('data:info')
  .alias('dr')
  .action(async () => {
    await graphRepo.removeAllData();
    console.log('DATA REMOVED 😀');
  });

program.on('command:*', function () {
  console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
  process.exit(1);
});

program.parse(process.argv);