import {
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLString,
	GraphQLFloat,
	GraphQLInt,
	GraphQLList,
} from 'graphql'
import { oGetBalance } from './lib/sms-api'
import { SMSModel } from './db/models'

const AccountBalanceType = new GraphQLObjectType({
	name: 'AccountBalanceType',
	fields: () => ({
		credit: { type: GraphQLFloat },
		currency: { type: GraphQLString },
		id: { type: GraphQLInt },
	}),
})

const MessageType = new GraphQLObjectType({
	name: 'MessagesType',
	fields: () => ({
		id: { type: GraphQLInt },
		body: { type: GraphQLString },
		from: { type: GraphQLInt },
		time: { type: GraphQLInt },
	}),
})

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: () => ({
		balance: {
			type: AccountBalanceType,
			resolve: async () => await oGetBalance(),
		},
		messages: {
			type: GraphQLList(MessageType),
			resolve: async () => await getMessages(),
		},
	}),
})

export default new GraphQLSchema({
	query: RootQuery,
})

const getMessages = async () => {
	return SMSModel.findAll().map((oMessage: any) => {
		return {
			body: oMessage.message,
			from: oMessage.receiver,
			time: oMessage.senttime,
		}
	})
}
