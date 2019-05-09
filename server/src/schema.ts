import {
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLString,
	GraphQLFloat,
	GraphQLInt,
} from 'graphql'
import { oGetBalance } from './lib/sms-api'

const AccountBalanceType = new GraphQLObjectType({
	name: 'AccountBalanceType',
	fields: () => ({
		credit: { type: GraphQLFloat },
		currency: { type: GraphQLString },
		id: { type: GraphQLInt },
	}),
})

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: () => ({
		balance: {
			type: AccountBalanceType,
			resolve: async () => await oGetBalance(),
		},
	}),
})

export default new GraphQLSchema({
	query: RootQuery,
})
