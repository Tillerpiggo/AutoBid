import { Contact } from './interfaces';
import ContactOptions from './ContactOptions';
import { Box, Stack, Flex, Text, useColorModeValue, Avatar, Button } from '@chakra-ui/react';
import PersonaButton from './PersonaButton';
import React from 'react';
import DateService from './dateService';

interface ContactItemProps {
    contact: Contact;
    onClick: (contact: Contact) => void;
    onEdit: (contact: Contact) => void;
    onPersonalize: (contact: Contact) => void; // New prop
    onDelete: (id: string) => Promise<void>;
}

const ContactItem: React.FC<ContactItemProps> = ({
    contact,
    onDelete,
    onClick: onDetailsOpen,
    onPersonalize,
    onEdit,
}) => {
    const birthday = DateService.getFormattedDate(contact.birthdayDay, contact.birthdayMonth);

    console.log("contact", contact);

    const handleDelete = () => {
        onDelete(contact.id);
    };

    const handleEditFromContactOptions = () => {
        onEdit(contact);
    };

    const handleItemClick = () => {
        onDetailsOpen(contact);
    };

    const handlePersonalize = () => {
        onPersonalize(contact);
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
            transition="all 0.2s"
        >
            <Flex direction="row" justify="space-between" align="center">
                <Stack direction="row" spacing={4} align="center">
                    <Avatar src="https://example.com/path-to-profile-pic.jpg" />
                    <Stack direction="column" spacing={0} fontSize="sm">
                        <Text fontWeight={600}>{contact.name}</Text>
                        <Text color="gray.500">{birthday}</Text>
                    </Stack>
                </Stack>
                <Flex direction="row" align="center">
                    <PersonaButton
                        onClick={handlePersonalize}
                        persona={contact.persona}
                    />
                    <ContactOptions onEdit={handleEditFromContactOptions} onDelete={handleDelete} />
                </Flex>
            </Flex>
        </Box>
    );
}

export default ContactItem;