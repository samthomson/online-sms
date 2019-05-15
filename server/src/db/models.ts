import * as Sequelize from 'sequelize'
import db from './connection'

export const SMSModel = db.define('smss', {
	sms_id: {
		type: Sequelize.INTEGER,
	},
	msisdn: {
		type: Sequelize.INTEGER,
	},
	receiver: {
		type: Sequelize.INTEGER,
	},
	message: {
		type: Sequelize.TEXT,
	},
	senttime: {
		type: Sequelize.INTEGER,
	},
	webhook_label: {
		type: Sequelize.TEXT,
	},
})
