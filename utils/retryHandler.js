const { addNotificationToQueue } = require('../queues/notificationQueue')

const retryNotification = async (data) => {
  data.attempt += 1
  if (data.attempt <= parseInt(process.env.RETRY_LIMIT)) {
    await new Promise(resolve => setTimeout(resolve, 2000 * data.attempt))
    await addNotificationToQueue(data)
  }
}

module.exports = { retryNotification }
