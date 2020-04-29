# Wikipedia knowledge graph

Wikipedia pages connectedness visualization.

![ims](https://i.ibb.co/8P0byVb/Screenshot-2019-11-16-at-22-17-29.png)
Preview.

## Setup

Provide mysql database credentials manually:
```dotenv
DB_HOST = localhost
DB_PORT = 3306
DB_USER = someuser
DB_NAME = databasename
DB_PASSWORD = yourpassword
```

Or provide mysql connection string:
```dotenv
DB_STRING = yourconnectionstring
```

## Usage

In the project directory, you can run:

1. Install dependencies with `npm i` or `yarn install`

2. Run server app with `npm start` or `yarn start`


### Cli commands

- List of available commands: `node src/bin/cli --help`

- Start with this command. Scrapes all neighbours from given page url: `node src/bin/cli scrape --link <url>`

- Scrapes 3 degrees from given page url (breath first search):`node src/bin/cli bfs --initial <url>`

- Scrapes <num> degrees from given url (depth first scrape):`node src/bin/cli dbs --initial <wiki-link> --degrees <num>`
