## Wikipedia knowledge graph
Graph construction and visualization of wikipedia knowledge interconnectedness.

![ims](https://i.ibb.co/rGtCcyZ/Screenshot-2019-06-29-at-13-05-07.png)
<br>All direct connections to pages on Artificial Intelligence wiki (1600 links to pages)

![ims](https://i.ibb.co/R6m01DL/Screenshot-2019-06-29-at-13-32-11.png)
<br>Limited 3 degree network with max 200 connections per page originating from Artificial Intelligence wiki (18.000 pages total)

![ims](https://i.ibb.co/phqy7bp/Screenshot-2019-06-29-at-14-23-40.png)
<br>Limited 3 degree network with max 420 connections per page originating from Artificial Intelligence wiki (40.000 pages total)

### Available Scripts

In the project directory, you can run:

##### `npm start`

Runs the server app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


##### `node bin/cli --help`

List of available command tools and commands<br>


##### `node bin/cli scrape --link <wiki-link>`

Scrapes all the connections to other pages from page <wiki-link><br>


##### `node bin/cli bfs --initial <wiki-link>`

Scrapes 3 degree graph from initial page <wiki-link> (breadh first scrape).<br>


##### `node bin/cli dbs --initial <wiki-link> --degrees <num>`

Scrapes <num> degree graph from initial page <wiki-link> (depth first scrape).<br>