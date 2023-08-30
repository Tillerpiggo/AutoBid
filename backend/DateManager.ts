import { DateTime } from 'luxon';

class DateManager {
    isToday(day: number, month: number, timezone: string): boolean {
        if (day < 1 || day > 31) {
            throw new Error('Invalid day');
        }
        if (month < 1 || month > 12) {
            throw new Error('Invalid month');
        }
        if (!DateTime.fromObject({}, {zone: timezone}).isValid) {
            throw new Error('Invalid timezone');
        }
        
        const now = DateTime.now().setZone(timezone);
        return now.day === day && now.month === month;
    }
}

export = DateManager;