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
        <Box minHeight="100vh" p={8} bg="white">
            <Heading as="h2" mb={6}>Time Settings</Heading>
            <VStack align="start" spacing={8}>
                <FormControl id="email-time">
                    <FormLabel fontSize="lg">Email time:</FormLabel>
                    <TimePicker 
                        format='HH:mm'
                        value={time}
                        onChange={handleTimeChange}
                        style={{ width: '100%', height: '40px', padding: '10px' }}
                    />
                </FormControl>
                <FormControl id="timezone">
                    <FormLabel fontSize="lg">Timezone:</FormLabel>
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
            </VStack>
        </Box>
    );
};

export default TimeSettings;