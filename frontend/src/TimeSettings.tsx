import React, { useState } from 'react';
import { TimePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import moment from 'moment-timezone';
import { Box, Heading, FormControl, FormLabel, Select, VStack, useColorModeValue } from "@chakra-ui/react";

dayjs.extend(utc);
dayjs.extend(timezone);

interface TimeSettingsProps {
    onTimeChange: (time: string) => void;
    onTimezoneChange: (timezone: string) => void;
    onDaysChange: (days: number) => void;
    initialTime: string;
    initialTimezone: string;
    initialDays: number;
}

const TimeSettings: React.FC<TimeSettingsProps> = ({ onTimeChange, onTimezoneChange, onDaysChange, initialTime, initialTimezone, initialDays }) => {
    const [time, setTime] = useState<Dayjs>(dayjs(initialTime, 'HH:mm'));
    const [timezone, setTimezone] = useState<string>(initialTimezone);
    const [days, setDays] = useState<number>(initialDays);

    const handleTimeChange = (value: Dayjs | null) => {
        if (!value) return;
        setTime(value);
        onTimeChange(value.format('HH:mm'));
    };

    const handleTimezoneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTimezone(event.target.value);
        onTimezoneChange(event.target.value);
    };

    const handleDaysChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDays(Number(event.target.value));
        onDaysChange(Number(event.target.value));
    };

    return (
        <Box minHeight="100vh" p={8} bg="white">
            <Heading as="h2" mb={6}>Time Settings</Heading>
            <VStack align="start" spacing={8}>
                <FormControl id="email-time">
                    <FormLabel fontSize="lg">Email Time:</FormLabel>
                    <TimePicker 
                        format='HH:mm'
                        value={time}
                        onChange={handleTimeChange}
                        style={{ width: '100%', height: '40px', padding: '10px' }}
                    />
                </FormControl>
                <FormControl id="timezone">
                    <FormLabel fontSize="lg">Time Zone:</FormLabel>
                    <Select 
                        placeholder="Select timezone" 
                        value={timezone} 
                        onChange={handleTimezoneChange}
                        size="lg"
                        bg="white"
                    >
                        {moment.tz.names().map((zone, index) => (
                            <option key={index} value={zone}>
                                {zone}
                            </option>
                        ))}
                    </Select>
                </FormControl>
                <FormControl id="email-advance-days">
                    <FormLabel fontSize="lg">Get suggestions ahead of time </FormLabel>
                    <Select 
                        placeholder="Select number of days" 
                        value={days} 
                        onChange={handleDaysChange}
                        size="lg"
                        bg="white"
                    >
                        <option value={3}>3 Days Early</option>
                        <option value={7}>7 Days Early</option>
                        <option value={14}>14 Days Early</option>
                        <option value={21}>21 Days Early</option>
                    </Select>
                </FormControl>
            </VStack>
        </Box>
    );
};

export default TimeSettings;