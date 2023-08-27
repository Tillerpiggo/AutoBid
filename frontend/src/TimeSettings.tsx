import React, { useState } from 'react';
import { TimePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import moment from 'moment-timezone';

// Load the utc and timezone plugins for dayjs
dayjs.extend(utc);
dayjs.extend(timezone);

interface TimeSettingsProps {
    onTimeChange: (time: string) => void;
    onTimezoneChange: (timezone: string) => void;
    initialTime: string;
    initialTimezone: string;
}

const TimeSettings: React.FC<TimeSettingsProps> = ({ onTimeChange, onTimezoneChange, initialTime, initialTimezone }) => {
    const [time, setTime] = useState<Dayjs>(dayjs(initialTime, 'HH:mm'));
    const [timezone, setTimezone] = useState<string>(initialTimezone);

    const handleTimeChange = (value: Dayjs | null) => {
        if (!value) return;
        setTime(value);
        onTimeChange(value.format('HH:mm'));
    };

    const handleTimezoneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTimezone(event.target.value);
        onTimezoneChange(event.target.value);
    };

    return (
        <div>
            <h2>Time Settings</h2>
            <label>
                Email time:
                <TimePicker 
                    format='HH:mm'
                    value={time}
                    onChange={handleTimeChange}
                />
            </label>
            <label>
                Timezone:
                <select value={timezone} onChange={handleTimezoneChange}>
                    {moment.tz.names().map((zone, index) => (
                        <option key={index} value={zone}>
                            {zone}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
};

export default TimeSettings;