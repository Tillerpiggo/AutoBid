import { Friend } from './interfaces';
import FriendItem from './FriendItem';
import FriendForm from './FriendForm';
import React, { useState } from 'react';

interface FriendListProps {
    friends: Friend[];
    onSubmitFriend: (friend: Friend) => Promise<void>;
    onDeleteFriend: (id: string) => Promise<void>;
}

const FriendList: React.FC<FriendListProps> = ({ friends, onSubmitFriend, onDeleteFriend }) => {
    const [editingFriend, setEditingFriend] = useState<Friend | null>(null);

    const handleEditComplete = () => {
        setEditingFriend(null); // Reset the editingFriend after the friend has been edited
    };

    const handleFormSubmit = async (friend: Friend) => {
        await onSubmitFriend(friend);
        handleEditComplete();
    };

    const handleDeleteFriend = async (id: string) => {
        await onDeleteFriend(id);
        handleEditComplete();
    };

    return (
        <div>
            {friends && friends.map((friend) => (
                editingFriend && editingFriend.id === friend.id ? (
                    <FriendForm 
                        key={friend.id}
                        friend={friend}
                        onSubmit={handleFormSubmit}
                        onDelete={() => handleDeleteFriend(friend.id)}
                    />
                ) : (
                    <FriendItem
                        key={friend.id}
                        friend={friend}
                        onEdit={() => setEditingFriend(friend)}
                    />
                )
            ))}
        </div>
    )
}

export default FriendList;