const { addNotificationToQueue } = require('../queues/notificationQueue');

const notificationStore = new Map();

const sendNotification = async (req, res) => {
  try {
    const { userId, type, message } = req.body;
    if (!userId || !type || !message) {
      return res.status(400).send('Invalid input');
    }

    const notification = {
      id: Date.now(),
      userId,
      type,
      message,
      timestamp: new Date()
    };

    // Store notification
    if (!notificationStore.has(userId)) {
      notificationStore.set(userId, []);
    }
    notificationStore.get(userId).push(notification);

    // Add to queue
    await addNotificationToQueue(notification);

    res.status(200).send('Notification queued and stored');
  } catch (error) {
    res.status(500).send('Internal server error');
  }
};

const getUserNotifications = (req, res) => {
  try {
    const userId = req.params.userId;
    const notifications = notificationStore.get(userId) || [];
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
};

module.exports = {
  sendNotification,
  getUserNotifications
};