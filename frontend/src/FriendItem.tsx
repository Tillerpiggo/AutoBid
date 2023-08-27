import { Friend } from './interfaces';
import FriendFormModal from './FriendFormModal'; // Import FriendFormModal
import React, { useState } from 'react';

interface FriendItemProps {
    friend: Friend;
    onEdit: (friend: Friend) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

const FriendItem: React.FC<FriendItemProps> = ({ friend, onEdit, onDelete }) => {

    const handleFormSubmit = async (friend: Friend) => {
        await onEdit(friend);
    };

    return (
        <div>
            <h2>{friend.name}</h2>
            <p>{friend.birthday.toString()}</p>
            <FriendFormModal 
                friend={friend} 
                onSubmit={handleFormSubmit}
                onDelete={onDelete}
            />
        </div>
    )
}

export default FriendItem;