import { IUser } from './models/User';
import schedule from 'node-schedule';
import moment from 'moment-timezone';

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
        const emailsToSend: {to: string, subject: string, message: string}[] = [];
    
        try {
            const users = await this.getUserList();
            for (const user of users) {
                // Get current date in user's timezone
                const nowInUserTimezone = moment().tz(user.timezone);
                console.log(`User's timezone is ${user.timezone}, and the current date/time in their timezone is ${nowInUserTimezone.format()}`);
    
                for (const contact of user.contacts) {
                    // Convert contacts's birthday to user's timezone
                    let contactBirthdayInUserTimezone = moment.utc(contact.birthday).tz(user.timezone);
                    // Remove minutes, seconds, and hours so it's just comparing day
                    contactBirthdayInUserTimezone.year(nowInUserTimezone.year()).month(nowInUserTimezone.month()).date(nowInUserTimezone.date());
                    console.log(`Contact's birthday is ${contact.birthday}, and in the user's timezone, this is ${contactBirthdayInUserTimezone.format()}`);
    
                    if (contactBirthdayInUserTimezone.isSame(nowInUserTimezone, 'day')) {
                        console.log(`It's ${contact.name}'s birthday today in the user's timezone!`);
                        emailsToSend.push({
                            to: user.email,
                            subject: `It's ${contact.name}'s Birthday Today!`,
                            message: `Don't forget to wish ${contact.name} a happy birthday!`
                        });
                    } else {
                        console.log(`It's not ${contact.name}'s birthday today in the user's timezone.`);
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
        schedule.scheduleJob('26 19 * * *', async () => {
            console.log("sending emails");
            await this.sendEmailsForToday();
        });
    }
}

export default EmailManager