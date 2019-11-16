<center><img src="public/images/network.png"/></center>

## Wikipedia knowledge graph
Graph construction and visualization of wikipedia knowledge interconnectedness.

![ims](https://i.ibb.co/8P0byVb/Screenshot-2019-11-16-at-22-17-29.png)
Preview.

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the server app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


#### `node bin/cli --help`

List of available command tools and commands<br>


#### `node bin/cli scrape --link <wiki-link>`

Start with this command. Scrapes all the connections to other pages from page <wiki-link><br>


#### `node bin/cli bfs --initial <wiki-link>`

Scrapes 3 degree graph from initial page <wiki-link> (breadh first scrape).<br>


#### `node bin/cli dbs --initial <wiki-link> --degrees <num>`

Scrapes <num> degree graph from initial page <wiki-link> (depth first scrape).<br>