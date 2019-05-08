import {
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLString,
	GraphQLFloat,
	GraphQLInt,
} from 'graphql'
import axios from 'axios'

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

const oGetBalance = async () => {
	try {
		const { API_TOKEN } = process.env
		const { data } = await axios.get('https://gatewayapi.com/rest/me', {
			params: { token: API_TOKEN },
		})

		return data
	} catch (error) {
		console.log(error)
		return {}
	}
}
