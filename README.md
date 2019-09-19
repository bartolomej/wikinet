## Wikipedia knowledge graph
Graph construction and visualization of wikipedia knowledge interconnectedness.

![ims](https://i.ibb.co/phqy7bp/Screenshot-2019-06-29-at-14-23-40.png)

### Available Scripts

##### `npm start`

Runs the server app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available commands

- List of available commands and examples: 
<br>`node bin/cli --help`

- Scrapes and saves all the links that is located on provided url
<br>`node bin/cli scrape:single <wiki-url>`

- Lists 20 most connected pages
<br> `node bin/cli list:multi`

- Displays page info by url:
<br> `node bin/cli list:single <url>`

- Removes all records from the database
<br>`node bin/cli data:remove`

- Displays number of nodes and connections
<br> `node bin/cli data:info`

### Environment variables
```
DB_HOST=localhost
DB_PORT=7687
DB_USER=neo4j
DB_PASSWORD=wiki
DB_NAME=wiki
PORT=3000
```

### Links and resources

- [Network analysis](https://tbgraph.wordpress.com/)
- [Cypher cheat sheet](https://neo4j.com/docs/2.1/cypher-refcard/)