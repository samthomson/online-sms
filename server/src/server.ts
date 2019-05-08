import * as express from 'express'
import * as expressGraphQL from 'express-graphql'
import schema from './schema'

const app: express.Application = express()

app.get('/', ({}, response: express.Response) => {
	response.send('root')
})

app.use(
	'/graphql',
	expressGraphQL({
		schema,
		graphiql: true,
	}),
)

app.listen(3100)
