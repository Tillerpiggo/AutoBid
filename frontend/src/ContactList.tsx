import { Contact } from './interfaces';
import ContactItem from './ContactItem';
import React from 'react';
import { VStack, Box, Center } from '@chakra-ui/react';

interface ContactListProps {
    contacts: Contact[];
    onEditContact: (contact: Contact) => Promise<void>;
    onDeleteContact: (id: string) => Promise<void>;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, onEditContact, onDeleteContact }) => {
    const handleContactEdit = async (contact: Contact) => {
        await onEditContact(contact);
    };

    const handleContactDelete = async (id: string) => {
        await onDeleteContact(id);
    };

    return (
        <Box
            width="full"
            borderRadius="2xl">
            <VStack spacing={2} alignItems="stretch" justifyContent="flex-start">
                {contacts && contacts.map((contact, index) => (
                    <Box zIndex={contacts.length - index} key={contact.id}>
                        <ContactItem
                            contact={contact}
                            onEdit={handleContactEdit}
                            onDelete={handleContactDelete}
                        />
                    </Box>
                ))}
            </VStack>
        </Box>
    );
}

export default ContactList;