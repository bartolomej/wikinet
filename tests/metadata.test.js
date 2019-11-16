const {getMetadata} = require('../src/services/scrape');

it('should fetch and parse metadata', async function () {
  let metadata = await getMetadata('https://en.wikipedia.org/wiki/Graph_theory');

  expect(metadata.image).toEqual('https://upload.wikimedia.org/wikipedia/commons/5/5b/6n-graf.svg');
  expect(metadata.description).toEqual(`<p>In mathematics, <b>graph theory</b> is the study of <i>graphs</i>, which are mathematical structures used to model pairwise relations between objects. A graph in this context is made up of <i>vertices</i> which are connected by <i>edges</i>. A distinction is made between <b>undirected graphs</b>, where edges link two vertices symmetrically, and <b>directed graphs</b>, where edges link two vertices asymmetrically; see Graph for more detailed definitions and for other variations in the types of graph that are commonly considered. Graphs are one of the prime objects of study in discrete mathematics.</p>`);
});