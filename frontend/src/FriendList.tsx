import { Friend } from './interfaces';
import FriendItem from './FriendItem';
import React from 'react';
import { VStack, Box, Center } from '@chakra-ui/react';

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
            <Box
                width="full"
                borderRadius="2xl">
                <VStack spacing={2} alignItems="stretch" justifyContent="flex-start">
                    {friends && friends.map((friend) => (
                    <FriendItem
                        key={friend.id}
                        friend={friend}
                        onEdit={handleFriendEdit}
                        onDelete={handleFriendDelete}
                    />
                    ))}
                </VStack>
            </Box>
    );
}

export default FriendList;