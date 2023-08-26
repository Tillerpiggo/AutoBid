import React, { useState, useEffect } from 'react';
import { User, Friend } from './interfaces';
import FriendList from './FriendList';
import FriendForm from './FriendForm';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserDisplay: React.FC = () => {
    const { email } = useParams<{ email: string }>();
    const [userData, setUserData] = useState<User | null>(null);
    const [editingFriend, setEditingFriend] = useState<Friend | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch(`http://localhost:3000/users/${email}`);
            if (!response.ok) {
                console.error('Failed to fetch user data');
                return;
            }
            const data = await response.json();
            setUserData(data.user);
        };

        fetchUserData();
    }, [email]);

    const handleEditFriend = (friend: Friend) => {
        setEditingFriend(friend);
    }

    const handleSubmitEditFriend = async (friend: Friend) => {
        if (!userData) {
            console.error('User data is not loaded');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:3000/users/${userData.id}/friends/${friend.id}`, {
                name: friend.name,
                birthday: friend.birthday
            });

            if (response.data && response.data.message === 'Friend updated') {
                console.log('Friend updated successfully');
                setUserData(response.data.user);
                setEditingFriend(null); // Close the form after successful update
            } else {
                console.error('Failed to update friend');
            }
        } catch (error) {
            console.error('Failed to update friend', error);
        }
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
            // Handle error...
            console.error('Failed to add friend');
            return;
        }

        const updatedUser = await response.json();

        // Now you can update your local state with the updated user data
        // For instance, if you're using useState to manage user state:
        setUserData(updatedUser.userForClient);
        console.log("updatedUser: ", updatedUser.userForClient);
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