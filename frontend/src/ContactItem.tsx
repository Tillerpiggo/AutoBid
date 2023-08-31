import { Contact } from './interfaces';
import ContactOptions from './ContactOptions';
import { Box, Stack, Flex, Text, useColorModeValue, Avatar } from '@chakra-ui/react';
import React from 'react';
import DateService from './dateService';

interface ContactItemProps {
    contact: Contact;
    onClick: (contact: Contact) => void;
    onEdit: (contact: Contact) => void;
    onDelete: (id: string) => Promise<void>;
}

const ContactItem: React.FC<ContactItemProps> = ({ 
    contact, 
    onDelete,
    onClick: onDetailsOpen,
    onEdit
}) => {
    // Formatted birthday using DateService
    const birthday = DateService.getFormattedDate(contact.birthdayDay, contact.birthdayMonth);

    const handleDelete = () => {
        onDelete(contact.id);
    };

    const handleStartEdit = () => {
        onEdit(contact);
    };

    const handleEditFromContactOptions = () => {
        onEdit(contact);
    };

    const handleItemClick = () => {
        onDetailsOpen(contact);
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
                        <Text fontWeight={600}>{contact.name}</Text>
                        <Text color="gray.500">{birthday}</Text>
                    </Stack>
                </Stack>
                <ContactOptions onEdit={handleEditFromContactOptions} onDelete={handleDelete} />
            </Flex>
        </Box>
    );
}

export default ContactItem;