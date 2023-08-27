import React, { useState, useEffect } from 'react';
import { User, Friend } from './interfaces';
import FriendList from './FriendList';
import FriendForm from './FriendForm';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserDisplay: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const [userData, setUserData] = useState<User | null>(null);
    const [editingFriend, setEditingFriend] = useState<Friend | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch(`http://localhost:3000/users/${userId}`);
            if (!response.ok) {
                console.error('Failed to fetch user data');
                return;
            }
            const data = await response.json();
            setUserData(data.user);
        };

        fetchUserData();
    }, [userId]);
    

    const handleEditFriend = (friend: Friend) => {
        setEditingFriend(friend);
    }

    const handleFriendUpdated = (updatedUser: User) => {
        setUserData(updatedUser);
    };

    const handleEditComplete = () => {
        setEditingFriend(null);
    };

    const handleDeleteFriend = (id: string) => {
        // Add your logic to delete friend
    }

    const handleAddFriend = async (newFriend: Friend) => {
        if (!userData) {
            console.error('User data is not available');
            return;
        }

        const response = await fetch(`http://localhost:3000/users/${userData.email}/friends`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newFriend.name, birthday: newFriend.birthday }),
        });

        if (!response.ok) {
            console.error('Failed to add friend');
            return;
        }

        const updatedUser = await response.json();

        setUserData(updatedUser.user);
        console.log("updatedUser: ", updatedUser.user);
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>User Display</h1>
            <p>Email: {userData.email}</p>
            <h2>Friends</h2>
            {editingFriend ? (
                <FriendForm friend={editingFriend} onSubmit={handleSubmitEditFriend} />
            ) : (
                <FriendList 
                    friends={userData.friends} 
                    onAddFriend={handleAddFriend}
                    onEditFriend={handleEditFriend} 
                    onDeleteFriend={handleDeleteFriend} 
                />
            )}
        </div>
    );
}

export default UserDisplay;