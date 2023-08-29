import { Friend } from './interfaces';
import ContactOptions from './ContactOptions';
import { 
    Box, Stack, Flex, Text, useColorModeValue, Avatar, useDisclosure, 
    Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton 
} from '@chakra-ui/react';
import React from 'react';
import FriendForm from './FriendForm';
import FriendDetail from './FriendDetail';

interface FriendItemProps {
    friend: Friend;
    onEdit: (friend: Friend) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

const FriendItem: React.FC<FriendItemProps> = ({ friend, onEdit, onDelete }) => {
    const detailDisclosure = useDisclosure();
    const editDisclosure = useDisclosure();

    const handleDelete = () => {
        onDelete(friend.id);
    };

    const handleEdit = () => {
        editDisclosure.onOpen();
    };

    const handleEditFromContactOptions = () => {
        editDisclosure.onOpen();
        detailDisclosure.onClose();
    };

    const handleItemClick = () => {
        detailDisclosure.onOpen();
    };

    return (
        <Box
            width="full"
            backgroundColor={useColorModeValue('white', 'gray.900')}
            borderRadius="xl"
            padding={6}
            _hover={{
                bg: useColorModeValue('white', 'gray.900'),
                transform: 'scale(1.02)',
                boxShadow: '2xl',
            }}
            onClick={handleItemClick}
            transition="all 0.2s">
            <Flex direction="row" justify="space-between" align="center">
                <Stack direction="row" spacing={4} align="center">
                    <Avatar src="https://example.com/path-to-profile-pic.jpg" />
                    <Stack direction="column" spacing={0} fontSize="sm">
                        <Text fontWeight={600}>{friend.name}</Text>
                        <Text color="gray.500">{new Date(friend.birthday).toDateString()}</Text>
                    </Stack>
                </Stack>
                <ContactOptions onEdit={handleEditFromContactOptions} onDelete={handleDelete} />
            </Flex>
            <Modal isOpen={detailDisclosure.isOpen} onClose={detailDisclosure.onClose}>
                <ModalOverlay />
                <ModalContent maxW="320px">
                    <ModalBody>
                        <FriendDetail friend={friend} onEdit={handleEdit} onDelete={handleDelete} />
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Modal isOpen={editDisclosure.isOpen} onClose={editDisclosure.onClose}>
                <ModalOverlay />
                <ModalContent maxW="320px">
                    <ModalCloseButton />
                    <ModalBody>
                        <FriendForm friend={friend} onSubmit={onEdit} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default FriendItem;