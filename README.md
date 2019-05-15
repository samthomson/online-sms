# online-sms

Typescript server app which has webhook endpoints for twillio, and a graphQL API for the client.
The client is a React TS SPA with redux / graphQL.

## setup

- clone repo, cd in
- complete the `.env` file `cp .env.sample .env` and fill in values
- install dependencies for each container: `docker-compose run client yarn && docker-compose run server yarn`
- finally `docker-compose up`, you can now browse to `http://localhost:3000`

## notes

Integrated with gateway API: https://gatewayapi.com/docs/rest.html#mo-sms-receiving-sms-es

## todo

- store in db?
- swap express for koa
- test with number
- send email on new sms
- protect graphql with auth