const sendEmail = require('./emailService')
const sendSMS = require('./smsService')
const sendInApp = require('./inAppService')
const { retryNotification } = require('../utils/retryHandler')

const processNotification = async (data) => {
  const { type } = data
  try {
    if (type === 'email') await sendEmail(data)
    else if (type === 'sms') await sendSMS(data)
    else if (type === 'in-app') await sendInApp(data)
    else throw new Error('Unknown notification type')
  } catch (e) {
    await retryNotification(data)
  }
}

module.exports = { processNotification }
