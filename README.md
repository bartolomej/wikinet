## wiki-knowledge-graph
Scraping and visualization algorithm for wikipedia knowledge graph.

![ims](https://i.ibb.co/mGjy5k2/Screenshot-2019-06-27-at-18-15-42.png)

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the server app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


#### `node bin/cli --help`

List of available command tools and commands<br>


#### `node bin/cli scrape --link <wiki-link>`

Scrapes all the connections to other pages from page <wiki-link><br>


#### `node bin/cli scrape --initial <wiki-link>`

Scrapes 3 degree graph from initial page <wiki-link><br>
