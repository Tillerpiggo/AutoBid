import { DateTime } from 'luxon';

class DateManager {
    isTargetDay(day: number, month: number, daysOffset: number, timezone: string): boolean {
        if (day < 1 || day > 31) {
            throw new Error('Invalid day');
        }
        if (month < 1 || month > 12) {
            throw new Error('Invalid month');
        }
        if (!DateTime.fromObject({}, {zone: timezone}).isValid) {
            throw new Error('Invalid timezone');
        }

        const targetDate = DateTime.now().setZone(timezone).plus({days: daysOffset});
        console.log(`targetDate: ${targetDate.day} ${targetDate.month}`);
        return targetDate.day === day && targetDate.month === month;
    }
}

export = DateManager;