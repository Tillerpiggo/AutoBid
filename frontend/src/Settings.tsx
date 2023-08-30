import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import TimeSettings from './TimeSettings';
import userService from './userService';
import { User } from './interfaces';

const Settings: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const [userData, setUserData] = useState<User | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) {
                console.error('No user ID provided');
                return;
            }
            const user = await userService.getUser(userId);
            setUserData(user);
        };
    
        fetchUserData();
    }, [userId]);

    const handleTimeChange = async (newTime: string) => {
        if (!userId || !userData) {
            console.error('No user ID provided or user data not loaded');
            return;
        }
        const updatedUser = await userService.updateUser(userId, userData.timezone, newTime);
        setUserData(updatedUser);
        console.log('New time:', newTime);
    }

    const handleTimezoneChange = async (newTimezone: string) => {
        if (!userId || !userData) {
            console.error('No user ID provided or user data not loaded');
            return;
        }
        const updatedUser = await userService.updateUser(userId, newTimezone, userData.emailSendTime);
        setUserData(updatedUser);
        console.log('New timezone:', newTimezone);
    }

    if (!userData) return null; // Or a loading spinner

    return (
        <TimeSettings
            initialTime={userData.emailSendTime}
            initialTimezone={userData.timezone}
            onTimeChange={handleTimeChange}
            onTimezoneChange={handleTimezoneChange}
        />
    );
};

export default Settings;