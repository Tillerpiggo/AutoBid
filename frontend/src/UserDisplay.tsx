import React, { useState, useEffect } from 'react';
import { User, Friend } from './interfaces';
import FriendList from './FriendList';
import { useLocation } from 'react-router-dom';

const UserDisplay: React.FC = () => {
    const location = useLocation();
    const user = location.state.user;

    const [userData, setUserData] = useState<User | null>(null);

    useEffect(() => {
        setUserData(user.user);
    }, [user]);

    const handleEditFriend = (friend: Friend) => {
        // Add your logic to edit friend
    }

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
            <FriendList 
                friends={userData.friends} 
                onAddFriend={handleAddFriend}
                onEditFriend={handleEditFriend} 
                onDeleteFriend={handleDeleteFriend} 
            />
        </div>
    );
}

export default UserDisplay;