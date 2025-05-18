const inAppStore = require('../data/inAppStore') // <-- same import

const sendInApp = async ({ userId, message }) => {
  if (!inAppStore[userId]) inAppStore[userId] = []
  inAppStore[userId].push({ message, timestamp: new Date() })
}

module.exports = sendInApp
