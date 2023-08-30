class DateService {
    private static months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
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
}

export default DateService;