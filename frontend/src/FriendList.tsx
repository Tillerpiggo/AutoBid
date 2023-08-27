import { Friend } from './interfaces';
import FriendItem from './FriendItem';
import FriendEditor from './FriendEditor';
import React, { useState } from 'react';

interface FriendListProps {
    friends: Friend[];
    onEditFriend: (friend: Friend) => void;
    onDeleteFriend: (id: string) => void;
    onFriendUpdated: (updatedUser: User) => void;
    userId: string | undefined;
}

const FriendList: React.FC<FriendListProps> = ({ friends, onEditFriend, onDeleteFriend, onFriendUpdated, userId }) => {
    const [editingFriend, setEditingFriend] = useState<Friend | null>(null);

    const handleEditComplete = () => {
        setEditingFriend(null); // Reset the editingFriend after the friend has been edited
    };

    return (
        <div>
            {friends && friends.map((friend) => (
                editingFriend && editingFriend.id === friend.id ? (
                    <FriendEditor 
                        key={friend.id}
                        friend={friend}
                        userId={userId}
                        onFriendUpdated={onFriendUpdated}
                        onEditComplete={handleEditComplete}
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