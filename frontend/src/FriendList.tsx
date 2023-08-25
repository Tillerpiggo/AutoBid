import { Friend } from './interfaces';
import FriendItem from './FriendItem';
import FriendForm from './FriendForm';
import React, { useState } from 'react';

interface FriendListProps {
    friends: Friend[];
    onAddFriend: (friend: Friend) => void;
    onEditFriend: (friend: Friend) => void;
    onDeleteFriend: (id: string) => void;
}

const FriendList: React.FC<FriendListProps> = ({ friends, onAddFriend, onEditFriend, onDeleteFriend }) => {
    const [isAdding, setIsAdding] = useState(false);

    const handleAddFriend = (friend: Friend) => {
        onAddFriend(friend);
        setIsAdding(false);
    };

    return (
        <div>
            {friends && friends.map(friend => (
                <FriendItem
                    key={friend.id}
                    friend={friend}
                    onEdit={onEditFriend}
                    onDelete={onDeleteFriend}
                />
            ))}
            {isAdding && <FriendForm onSubmit={handleAddFriend} />}
            {!isAdding && <button onClick={() => setIsAdding(true)}>Add Friend</button>}
        </div>
    )
}

export default FriendList;