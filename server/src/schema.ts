import {
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLString,
	GraphQLFloat,
	GraphQLInt,
} from 'graphql'

const AccountBalanceType = new GraphQLObjectType({
	name: 'AccountBalanceType',
	fields: () => ({
		credit: { type: GraphQLFloat },
		currency: { type: GraphQLString },
		accountId: { type: GraphQLInt },
	}),
})

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: () => ({
		balance: {
			type: AccountBalanceType,
			resolve: async () => {
				return {
					credit: 100.12,
					currency: 'DKK',
					accountId: 54,
				}
			},
		},
	}),
})

export default new GraphQLSchema({
	query: RootQuery,
})
