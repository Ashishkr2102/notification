const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Notification = require('./notificationModel');
const queue = require('./queue');

const app = express();
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://Ashish:1234@cluster0.mgutj.mongodb.net/notification-service', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Send notification endpoint
app.post('/notifications', async (req, res) => {
    try {
        const { userId, type, message } = req.body;

        // Validate request
        if (!userId || !type || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        if (!['EMAIL', 'SMS', 'IN_APP'].includes(type)) {
            return res.status(400).json({ error: 'Invalid notification type' });
        }

        // Create notification
        const notification = new Notification({
            userId,
            type,
            message
        });

        // Save to database
        await notification.save();

        // Add to queue for processing
        await queue.add(notification);

        res.status(201).json({
            message: 'Notification queued successfully',
            notification
        });
    } catch (error) {
        console.error('Error creating notification:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get user notifications endpoint
app.get('/users/:id/notifications', async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.params.id })
            .sort({ createdAt: -1 })
            .limit(50);

        res.json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 