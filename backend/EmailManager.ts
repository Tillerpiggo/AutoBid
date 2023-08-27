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
        today.setUTCHours(0, 0, 0, 0); // Fix for the today date
    
        const emailsToSend: {to: string, subject: string, message: string}[] = [];
    
        try {
            const users = await this.getUserList();
            console.log(`Total users: ${users.length}`); // log the total number of users
            for (const user of users) {
                console.log(`Checking user ${user.email} with ${user.friends.length} friends`); // log the current user and the number of their friends
                for (const friend of user.friends) {
                    // Fix for the friend's birthday
                    const friendBirthday = new Date(friend.birthday);
                    friendBirthday.setUTCHours(0, 0, 0, 0);
    
                    console.log(`Checking friend ${friend.name} with birthday on ${friendBirthday}`); // log the current friend and their birthday
                    if (friendBirthday.getUTCMonth() === today.getUTCMonth() && friendBirthday.getUTCDate() === today.getUTCDate()) {
                        // If the friend's birthday is today, add an email to the list
                        console.log(`It's ${friend.name}'s birthday today, adding email to list`); // log when an email is being added to the list
                        emailsToSend.push({
                            to: user.email,
                            subject: `It's ${friend.name}'s Birthday Today!`,
                            message: `Don't forget to wish ${friend.name} a happy birthday!`
                        });
                    } else {
                        console.log(`It's not ${friend.name}'s birthday today`); // log when it's not a friend's birthday
                    }
                }
            }
            console.log(`Total emails to send: ${emailsToSend.length}`); // log the total number of emails to send
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
        schedule.scheduleJob('0 9 * * *', async () => {
            console.log("sending emails");
            await this.sendEmailsForToday();
        });
    }
}

export default EmailManager