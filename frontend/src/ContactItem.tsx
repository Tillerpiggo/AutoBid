import { Contact } from './interfaces';
import ContactOptions from './ContactOptions';
import { 
    Box, Stack, Flex, Text, useColorModeValue, Avatar, useDisclosure, 
    Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton 
} from '@chakra-ui/react';
import React from 'react';
import ContactForm from './ContactForm';
import ContactDetail from './ContactDetail';
import DateService from './dateService';

interface ContactItemProps {
    contact: Contact;
    onEdit: (contact: Contact) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact, onEdit, onDelete }) => {
    const detailDisclosure = useDisclosure();
    const editDisclosure = useDisclosure();

    // Formatted birthday using DateService
    const birthday = DateService.getFormattedDate(contact.birthdayDay, contact.birthdayMonth);

    const handleDelete = () => {
        onDelete(contact.id);
    };

    const handleStartEdit = () => {
        editDisclosure.onOpen();
    };

    const handleFinishEdit = async (contact: Contact) => {
        await onEdit(contact);
        editDisclosure.onClose();
        detailDisclosure.onClose();
    }

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
                        <Text fontWeight={600}>{contact.name}</Text>
                        <Text color="gray.500">{birthday}</Text>
                    </Stack>
                </Stack>
                <ContactOptions onEdit={handleEditFromContactOptions} onDelete={handleDelete} />
            </Flex>
            <Modal isOpen={detailDisclosure.isOpen} onClose={detailDisclosure.onClose}>
                <ModalOverlay />
                <ModalContent maxW="320px">
                    <ModalBody>
                        <ContactDetail contact={contact} onEdit={handleStartEdit} onDelete={handleDelete} />
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Modal isOpen={editDisclosure.isOpen} onClose={editDisclosure.onClose}>
                <ModalOverlay />
                <ModalContent maxW="320px">
                    <ModalCloseButton />
                    <ModalBody>
                        <ContactForm contact={contact} onSubmit={handleFinishEdit} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default ContactItem;