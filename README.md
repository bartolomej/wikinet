# wikinet

Visualize how pages on wikipedia are connected (up to 3 degrees of depth).

![ims](https://i.ibb.co/8P0byVb/Screenshot-2019-11-16-at-22-17-29.png)

## Run with docker

1. [install docker-compose](https://docs.docker.com/compose/install/).
2. create `.env` file with the required env variables defined bellow
3. run the app with the following command: `docker-compose up`

## Running manually

In the project directory, you can run:

1. Install dependencies with `npm i` or `yarn install`

2. Run server app with `npm start` or `yarn start`


## Setup environment vars

Provide mysql database credentials manually:
```dotenv
DB_HOST = localhost
DB_PORT = 3306
DB_USER = someuser
DB_NAME = databasename
DB_PASSWORD = yourpassword
```

### Cli commands

- List of available commands: `node src/bin/cli --help`

- Start with this command. Scrapes all neighbours from given page url: `node src/bin/cli scrape --link <url>`

- Scrapes 3 degrees from given page url (breath first search):`node src/bin/cli bfs --initial <url>`

- Scrapes <num> degrees from given url (depth first scrape):`node src/bin/cli dbs --initial <wiki-link> --degrees <num>`
