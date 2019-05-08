import * as express from 'express'
import * as cors from 'cors'
import * as expressGraphQL from 'express-graphql'
import schema from './schema'

const app: express.Application = express()

// enable cors
var corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true, // <-- REQUIRED backend setting
}
app.use(cors(corsOptions))

app.get('/', ({}, response: express.Response) => {
	response.send('root')
})

// set up graphql
app.use(
	'/graphql',
	expressGraphQL({
		schema,
		graphiql: true,
	}),
)

app.listen(3100)
