import { Friend } from './interfaces';
import FriendFormModal from './FriendFormModal'; // Import FriendFormModal
import { Box, Stack, Flex, Text, useColorModeValue, Avatar } from '@chakra-ui/react';
import React from 'react';

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
        <Box
            width="full"
            backgroundColor={useColorModeValue('white', 'gray.900')}
            borderRadius="xl"
            padding={6}>
            <Flex direction="row" justify="space-between" align="center">
                <Stack direction="row" spacing={4} align="center">
                <Avatar src="https://example.com/path-to-profile-pic.jpg" />
                <Stack direction="column" spacing={0} fontSize="sm">
                    <Text fontWeight={600}>{friend.name}</Text>
                    <Text color="gray.500">{new Date(friend.birthday).toDateString()}</Text>
                </Stack>
                </Stack>
                <FriendFormModal
                friend={friend}
                onSubmit={handleFormSubmit}
                onDelete={onDelete}
                />
            </Flex>
        </Box>
    );
}

export default FriendItem;