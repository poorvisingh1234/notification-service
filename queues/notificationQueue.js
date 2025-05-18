const amqp = require('amqplib')
const { processNotification } = require('../services/notificationProcessor')

const queueName = 'notification_queue'
let channel

const connectQueue = async () => {
  const connection = await amqp.connect(process.env.RABBITMQ_URL)
  channel = await connection.createChannel()
  await channel.assertQueue(queueName)
  channel.consume(queueName, async (msg) => {
    if (msg !== null) {
      const data = JSON.parse(msg.content.toString())
      await processNotification(data)
      channel.ack(msg)
    }
  })
}

const addNotificationToQueue = async (data) => {
  if (!channel) await connectQueue()
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)))
}

module.exports = { addNotificationToQueue }
