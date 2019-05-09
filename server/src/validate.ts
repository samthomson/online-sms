import * as Joi from '@hapi/joi'

const vNumber = Joi.number()
	.min(0)
	.required()
const vString = Joi.string().required()

const schema = Joi.object().keys({
	id: vNumber,
	msisdn: vNumber,
	receiver: vNumber,
	senttime: vNumber,
	message: vString,
	webhook_label: vString,
	iat: vNumber,
})

export const bValidSMS = (oPossibleSMS: object): boolean => {
	const { error } = Joi.validate(oPossibleSMS, schema)

	return error ? false : true
}
