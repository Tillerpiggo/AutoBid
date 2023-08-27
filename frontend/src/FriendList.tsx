import { Friend } from './interfaces';
import FriendItem from './FriendItem';
import React from 'react';

interface FriendListProps {
    friends: Friend[];
    onEditFriend: (friend: Friend) => Promise<void>;
    onDeleteFriend: (id: string) => Promise<void>;
}

const FriendList: React.FC<FriendListProps> = ({ friends, onEditFriend, onDeleteFriend }) => {
    const handleFriendEdit = async (friend: Friend) => {
        await onEditFriend(friend);
    };

    const handleFriendDelete = async (id: string) => {
        await onDeleteFriend(id);
    };

    return (
        <div>
            {friends && friends.map((friend) => (
                <FriendItem
                    key={friend.id}
                    friend={friend}
                    onEdit={handleFriendEdit}
                    onDelete={handleFriendDelete}
                />
            ))}
        </div>
    )
}

export default FriendList;