import { IUser } from './models/User';
import schedule from 'node-schedule';

const mailchimpFactory = require("@mailchimp/mailchimp_transactional/src/index.js");
const mailchimp = mailchimpFactory(process.env.MAILCHIMP_API_KEY);
console.log("API_KEY", process.env.MAILCHIMP_API_KEY);
console.log("EMAIL", process.env.MAILCHIMP_FROM_EMAIL);

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
            console.log(`Response from Mailchimp: ${JSON.stringify(response)}`);
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
            console.log('Users:', users);
            for (const user of users) {
                console.log('User:', user);
                for (const friend of user.friends) {
                    console.log('Friend:', friend);
                    
                    console.log('Friend Birthday: ', friend.birthday);
                    console.log('Today: ', today);
                    
                    console.log('Friend Birthday Month: ', friend.birthday.getMonth());
                    console.log('Today Month: ', today.getMonth());
                    
                    console.log('Friend Birthday Date: ', friend.birthday.getDate());
                    console.log('Today Date: ', today.getDate());
                    
                    if (friend.birthday.getMonth() === today.getMonth() && friend.birthday.getDate() === today.getDate()) {
                        // If the friend's birthday is today, add an email to the list
                        console.log(`Adding email to the list for: ${friend.name}`);
                        emailsToSend.push({
                            to: user.email,
                            subject: `It's ${friend.name}'s Birthday Today!`,
                            message: `Don't forget to wish ${friend.name} a happy birthday!`
                        });
                    } else {
                        console.log(`No match for: ${friend.name}'s birthday`);
                    }
                }
            }
      
            console.log('Final email list:', emailsToSend);
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
        console.log('Sending emails now...');
        this.sendEmailsForToday();
    }

    startDailyJob() {
        console.log('Starting daily job...');
        schedule.scheduleJob('0 8 * * *', async () => {
            await this.sendEmailsForToday();
        });
    }
}

export default EmailManager