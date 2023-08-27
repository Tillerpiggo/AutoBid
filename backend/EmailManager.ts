import { IUser } from './models/User';
import schedule from 'node-schedule';

const mailchimpFactory = require("@mailchimp/mailchimp_transactional/src/index.js");
const mailchimp = mailchimpFactory(process.env.MAILCHIMP_API_KEY);

class EmailManager {
    private getUserList: () => Promise<IUser[]>;

    constructor(getUserList: () => Promise<IUser[]>) {
        this.getUserList = getUserList;
    }

    private async sendEmail(to: string, subject: string, message: string) {
        try {
            const response = await mailchimp.messages.send({
                message: {
                    from_email: process.env.MAILCHIMP_FROM_EMAIL,
                    to: [{ email: to }],
                    subject: subject,
                    text: message
                }
            });
            return response;
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }

    private async getEmailsToSendToday(): Promise<{to: string, subject: string, message: string}[] | undefined> {
        const today = new Date();
        const emailsToSend: {to: string, subject: string, message: string}[] = [];

        try {
            const users = await this.getUserList();
            for (const user of users) {
                for (const friend of user.friends) {
                    if (friend.birthday.getMonth() === today.getMonth() && friend.birthday.getDate() === today.getDate()) {
                        // If the friend's birthday is today, add an email to the list
                        emailsToSend.push({
                            to: user.email,
                            subject: `It's ${friend.name}'s Birthday Today!`,
                            message: `Don't forget to wish ${friend.name} a happy birthday!`
                        });
                    }
                }
            }
            return emailsToSend;
        } catch (error) {
            console.error('Error getting emails to send:', error);
        }
    }

    async sendEmailsForToday() {
        const emailsToSend = await this.getEmailsToSendToday();
  
        if (emailsToSend) {
            for (const emailInfo of emailsToSend) {
                await this.sendEmail(emailInfo.to, emailInfo.subject, emailInfo.message);
                await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds before sending the next email
            }
        }
    }

    public sendEmailsNow() {
        this.sendEmailsForToday();
    }

    startDailyJob() {
        schedule.scheduleJob('53 02 * * *', async () => {
            console.log("sending emails");
            await this.sendEmailsForToday();
        });
    }
}

export default EmailManager