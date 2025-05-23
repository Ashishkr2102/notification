# Notification Service

A backend service for sending and managing notifications (Email, SMS, and In-app) using Node.js, Express, MongoDB, and RabbitMQ.

## Features

- Send notifications (Email, SMS, In-app)
- Get user notifications
- Queue-based notification processing
- MongoDB for data persistence

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- RabbitMQ

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/notification-service
   RABBITMQ_URL=amqp://localhost
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-email-password
   TWILIO_ACCOUNT_SID=your-twilio-sid
   TWILIO_AUTH_TOKEN=your-twilio-token
   TWILIO_PHONE_NUMBER=your-twilio-phone
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Send Notification
```
POST /api/notifications
```
Request body:
```json
{
    "userId": "user123",
    "type": "EMAIL",
    "title": "Welcome",
    "message": "Welcome to our platform!",
    "metadata": {
        "email": "user@example.com"
    }
}
```

### Get User Notifications
```
GET /api/users/{id}/notifications
```

## Notification Types

- EMAIL: For sending email notifications
- SMS: For sending SMS notifications
- IN_APP: For in-app notifications

## Queue Processing

The service uses RabbitMQ for processing notifications asynchronously. Each notification type is processed by its respective service:

- Email notifications are processed by the email service
- SMS notifications are processed by the SMS service
- In-app notifications are processed by the in-app service

## Error Handling

The service includes error handling for:
- Invalid notification types
- Failed queue processing
- Database errors
- API errors #   n o t i f i c a t i o n  
 