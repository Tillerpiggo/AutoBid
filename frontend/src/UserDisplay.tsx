import React, { useState, useEffect } from 'react';
import { User, Friend } from './interfaces';
import FriendList from './FriendList';
import FriendFormModal from './FriendFormModal'; // import the FriendFormModal component
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

    const handleFriendAdd = async (friend: Friend) => {
        await handleFriendSubmit(friend);
    };

    const handleFriendSubmit = async (friend: Friend) => {
        if (!userId) {
            console.error('No user ID provided');
            return;
        }
    
        let updatedUser: User | null = null;
    
        if (friend.id) {
            updatedUser = await userService.updateFriend(userId, friend);
        } else {
            updatedUser = await userService.addFriend(userId, friend);
        }
    
        if (updatedUser) {
            setUserData(updatedUser);
        }
    };

    const handleFriendDelete = async (friendId: string) => {
        if (!userId) {
            console.error('No user ID provided');
            return;
        }
    
        const updatedUser = await userService.deleteFriend(userId, friendId);
    
        if (updatedUser) {
            setUserData(updatedUser);
        } else {
            console.error('Failed to delete friend or update user data');
        }
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
                onEditFriend={handleFriendSubmit}
                onDeleteFriend={handleFriendDelete}
            />
            <FriendFormModal onSubmit={handleFriendAdd} onDelete={handleFriendDelete} /> {/* Add FriendFormModal */}
        </div>
    );
}

export default UserDisplay;