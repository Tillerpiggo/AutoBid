import ContactDetail from "./ContactDetail";
import { Contact } from "./interfaces";

class DateService {
    private static months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Decemeber"];
  
    private static getDaySuffix(day: number) {
        if (day % 10 === 1 && day !== 11) {
            return "st";
        } else if (day % 10 === 2 && day !== 12) {
            return "nd";
        } else if (day % 10 === 3 && day !== 13) {
            return "rd";
        } else {
            return "th";
        }
    };

    static getFormattedDate(day: number, month: number) {
        return `${this.months[month - 1]} ${day}${this.getDaySuffix(day)}`;
    }

    static getFormattedBirthday(contact: Contact) {
        return this.getFormattedDate(contact.birthdayDay, contact.birthdayMonth);
    }
}

export default DateService;