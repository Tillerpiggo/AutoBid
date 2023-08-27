import React, { useState, useEffect } from 'react';
import { User, Friend } from './interfaces';
import FriendList from './FriendList';
import { useParams } from 'react-router-dom';
import { userService } from './userService';

const UserDisplay: React.FC = () => {
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
    
    const handleFriendSubmit = async (friend: Friend) => {
        if (!userId) {
            console.error('No user ID provided');
            return;
        }
    
        if (friend.id) {
            const updatedUser = await userService.updateFriend(userId, friend);
            if (updatedUser) {
                setUserData(updatedUser);
            }
        } else {
            const updatedUser = await userService.addFriend(userId, friend);
            if (updatedUser) {
                setUserData(updatedUser);
            }
        }
    };

    const handleFriendDelete = async (id: string) => {
        // TODO: Call a userService.deleteFriend function and update the user data
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>User Display</h1>
            <p>Email: {userData.email}</p>
            <h2>Friends</h2>
            <FriendList 
                friends={userData.friends} 
                onSubmitFriend={handleFriendSubmit}
                onDeleteFriend={handleFriendDelete}
            />
        </div>
    );
}

export default UserDisplay;