class Queue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }

    async add(notification) {
        this.queue.push(notification);
        if (!this.processing) {
            this.process();
        }
    }

    async process() {
        if (this.queue.length === 0) {
            this.processing = false;
            return;
        }

        this.processing = true;
        const notification = this.queue.shift();

        try {
            // Simulate sending notification
            await this.sendNotification(notification);
            notification.status = 'SENT';
        } catch (error) {
            console.error('Failed to send notification:', error);
            notification.status = 'FAILED';
            notification.retryCount++;

            // Retry logic (max 3 retries)
            if (notification.retryCount < 3) {
                this.queue.push(notification);
            }
        }

        // Process next notification
        this.process();
    }

    async sendNotification(notification) {
        // Simulate different notification types
        switch (notification.type) {
            case 'EMAIL':
                console.log(`Sending email to user ${notification.userId}: ${notification.message}`);
                break;
            case 'SMS':
                console.log(`Sending SMS to user ${notification.userId}: ${notification.message}`);
                break;
            case 'IN_APP':
                console.log(`Sending in-app notification to user ${notification.userId}: ${notification.message}`);
                break;
        }

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

module.exports = new Queue(); 