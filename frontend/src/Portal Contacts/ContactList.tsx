import { Contact } from '../App/interfaces';
import ContactItem from './ContactItem';
import ContactDetail from './ContactDetail';
import ContactForm from './ContactForm';
import PersonaForm from './PersonaForm';
import React, { useState } from 'react';
import { VStack, Box, Modal, ModalOverlay, ModalContent, ModalBody, useDisclosure } from '@chakra-ui/react';


interface ContactListProps {
    contacts: Contact[];
    onEditContact: (contact: Contact) => Promise<void>;
    onPersonalizeContact: (contact: Contact) => Promise<void>;
    onDeleteContact: (id: string) => Promise<void>;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, onEditContact, onPersonalizeContact, onDeleteContact }) => {
    const [selectedContact, setSelectedContact] = useState<Contact | undefined>(undefined);

    const editDisclosure = useDisclosure();
    const detailDisclosure = useDisclosure();
    const personalizeDisclosure = useDisclosure(); // Disclosure for PersonaForm modal

    const openEditModal = async (contact: Contact) => {
        setSelectedContact(contact);
        editDisclosure.onOpen();
    };

    const openDetailModal = async (contact: Contact) => {
        setSelectedContact(contact);
        detailDisclosure.onOpen();
    };

    const openPersonalizeModal = async (contact: Contact) => {
        setSelectedContact(contact);
        personalizeDisclosure.onOpen();
    };

    const handleEditContact = async (contact: Contact) => {
        await onEditContact(contact);
        editDisclosure.onClose();
    }

    const handlePersonalizeContact = async (contact: Contact) => {
        await onPersonalizeContact(contact);
        personalizeDisclosure.onClose();
    }

    const handleDeleteContact = async () => {
        await onDeleteContact(selectedContact!.id);
    }

    const doesContactExist = (name: string) => {
        return contacts.some(c => c.name === name)
    }

    return (
        <Box width="full" borderRadius="2xl">
            <VStack spacing={2} alignItems="stretch" justifyContent="flex-start">
                {contacts && contacts.map((contact, index) => (
                    <Box zIndex={contacts.length - index} key={contact.id}>
                        <ContactItem
                            contact={contact}
                            onClick={() => openDetailModal(contact)}
                            onEdit={() => openEditModal(contact)}
                            onPersonalize={() => openPersonalizeModal(contact)}
                            onDelete={() => onDeleteContact(contact.id)}
                        />
                    </Box>
                ))}
            </VStack>
            <Modal isOpen={editDisclosure.isOpen} onClose={editDisclosure.onClose}>
                <ModalOverlay />
                <ModalContent maxW="320px">
                    <ModalBody>
                        <ContactForm 
                            contact={selectedContact} 
                            onSubmit={handleEditContact} 
                            doesContactExist={doesContactExist}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Modal isOpen={detailDisclosure.isOpen} onClose={detailDisclosure.onClose}>
                <ModalOverlay />
                <ModalContent maxW="320px">
                    <ModalBody>
                        <ContactDetail 
                            contact={selectedContact!} 
                            onEdit={() => openEditModal(selectedContact!)}
                            onPersonalize={() => openPersonalizeModal(selectedContact!)}
                            onDelete={handleDeleteContact} 
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Modal isOpen={personalizeDisclosure.isOpen} onClose={personalizeDisclosure.onClose}>
                <ModalOverlay />
                <ModalContent maxW="320px">
                    <ModalBody>
                        <PersonaForm 
                            contact={selectedContact!}
                            onSubmit={handlePersonalizeContact}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
}
export default ContactList;