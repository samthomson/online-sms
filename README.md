# online-sms

Typescript server app which has webhook endpoints for twillio, and a grpahQL API for the client.
The client is a React TS SPA with redux / graphQL.
Auth0.

## setup

- clone repo, cd in
- complete the `.env` file `cp .env.sample .env` and fill in values
- install dependencies for each container: `docker-compose run client yarn && docker-compose run server yarn`
- finally `docker-compose up`, you can now browse to `http://localhost:3000`

## todo

- graphql
	- query for current balance, should resolve to gateway api
- db
- client redux
- twillio integration
- send email on new sms
- auth
	- crude implementation
	- guarded routes
	- guard data with graphql