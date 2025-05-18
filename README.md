**Notification Service**
CREATED BY POORVI SINGH

**Overview**
This is a simple notification service API that supports sending notifications via email, SMS, and in-app messages.
Notifications are processed asynchronously through a message queue to ensure reliability and scalability.

**Features**
1. Send notifications via different channels: email, SMS, in-app

2. Asynchronous queue-based processing using RabbitMQ

3. Retry mechanism for failed notification attempts

4. In-memory storage for in-app notifications



**Setup Instructions**
Clone the repository

**bash
git clone <repo-url>
cd notification-service
Install dependencies

**bash
npm install
Set environment variables

Create a .env file in the root folder with the following variables:
PORT=5000
RABBITMQ_URL=amqp://localhost
Modify values as needed for your setup.

Start RabbitMQ server

Make sure RabbitMQ is installed and running locally or provide a valid RabbitMQ URL in .env.

Run the server

**bash
node server.js
The server will start on http://localhost:5000

API Endpoints
POST /notifications

Request Body (JSON):

json
{
  "userId": "123",
  "type": "in-app",
  "message": "Hello User!"
}
Description: Queues a notification for asynchronous processing.

GET /notifications/user/:id

Description: Fetch all in-app notifications for the user with ID :id.

**Retry Mechanism*
Failed notifications are retried automatically using a retry handler function located in/utils/retryHandler.js
This function is called inside the notification processing service (/services/notificationProcessor.js). 
Whenever a notification fails to send (e.g., email, SMS, or in-app), the system catches the error and invokes the retry handler to attempt resending the notification based on predefined retry logic.

**Assumptions**
RabbitMQ is installed and accessible at the URL provided in RABBITMQ_URL.

In-app notifications are stored in memory and will be lost if the service restarts.

Email and SMS services are abstracted and must be implemented separately.

The service runs on Node.js version 14 or above.



