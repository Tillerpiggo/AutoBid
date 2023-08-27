import React, { useState } from 'react';
import { User, Friend } from './interfaces';
import FriendForm from './FriendForm';
import axios from 'axios';

interface FriendEditorProps {
    friend?: Friend;  // Here friend is optional i.e., can be undefined.
    userId: string | undefined;
    onFriendUpdated: (updatedUser: User) => void;
    onEditComplete: () => void;
}

const FriendEditor: React.FC<FriendEditorProps> = ({ friend, userId, onFriendUpdated, onEditComplete }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmitEditFriend = async (editedFriend: Friend) => {
            setIsLoading(true);
        
        if (!userId || !friend) {
            console.error('User ID or friend data is not provided');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.put(`http://localhost:3000/users/${userId}/friends/${friend.id}`, {
                name: editedFriend.name,
                birthday: editedFriend.birthday
            });

            if (response.data && response.data.message === 'Friend updated') {
                console.log('Friend updated successfully');
                onFriendUpdated(response.data.user);
                onEditComplete();
            } else {
                console.error('Failed to update friend');
            }
        } catch (error) {
            console.error('Failed to update friend', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteFriend = async () => {
        setIsLoading(true);

        if (!userId || !friend) {
            console.error('User ID or friend data is not provided');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:3000/users/${userId}/friends/${friend.id}`);

            if (response.data && response.data.message === 'Friend deleted') {
                console.log('Friend deleted successfully');
                onFriendUpdated(response.data.user);
                onEditComplete();
            } else {
                console.error('Failed to delete friend');
            }
        } catch (error) {
            console.error('Failed to delete friend', error);
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <FriendForm 
      friend={friend} 
      onSubmit={handleSubmitEditFriend} 
      isSubmitting={isLoading}
      onDelete={friend ? handleDeleteFriend : undefined}
    />
  );
}

export default FriendEditor;