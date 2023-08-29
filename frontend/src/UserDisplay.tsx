import React, { useState, useEffect } from 'react';
import { User, Contact } from './interfaces';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import { useParams } from 'react-router-dom';
import { userService } from './userService';
import TimeSettings from './TimeSettings';
import {
    Box, VStack, Heading, Flex, Button, useDisclosure, Modal, 
    ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter
} from '@chakra-ui/react';

const UserDisplay: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const [userData, setUserData] = useState<User | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) {
                console.error('No user ID provided');
                return;
            }
            const user = await userService.getUser(userId);
            setUserData(user);
        };
    
        fetchUserData();
    }, [userId]);

    const handleContactAdd = async (contact: Contact) => {
        await handleContactSubmit(contact);
        onClose();
    };

    const handleContactSubmit = async (contact: Contact) => {
        if (!userId) {
            console.error('No user ID provided');
            return;
        }
    
        let updatedUser: User | null = null;
    
        if (contact.id) {
            updatedUser = await userService.updateContact(userId, contact);
        } else {
            updatedUser = await userService.addContact(userId, contact);
        }
    
        if (updatedUser) {
            setUserData(updatedUser);
        }
    };

    const handleContactDelete = async (contactId: string) => {
        if (!userId) {
            console.error('No user ID provided');
            return;
        }
    
        const updatedUser = await userService.deleteContact(userId, contactId);
    
        if (updatedUser) {
            setUserData(updatedUser);
        } else {
            console.error('Failed to delete contact or update user data');
        }
    };

    const handleTimeChange = async (newTime: string) => {
        if (!userId || !userData) {
            console.error('No user ID provided or user data not loaded');
            return;
        }
        const updatedUser = await userService.updateUser(userId, userData.timezone, newTime);
        setUserData(updatedUser);
        console.log('New time:', newTime);
    }

    const handleTimezoneChange = async (newTimezone: string) => {
        if (!userId || !userData) {
            console.error('No user ID provided or user data not loaded');
            return;
        }
        const updatedUser = await userService.updateUser(userId, newTimezone, userData.emailSendTime);
        setUserData(updatedUser);
        console.log('New timezone:', newTimezone);
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <Box minHeight="100vh" padding="5">
            <VStack spacing={8} align="stretch">
                <Flex justifyContent="space-between" width="100%">
                    <Heading as="h2">Contacts</Heading>
                    <Button onClick={onOpen}>Add Contact</Button>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent maxW="320px">
                            <ModalCloseButton />
                            <ModalBody>
                                <ContactForm onSubmit={handleContactAdd} />
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </Flex>
                <ContactList 
                    contacts={userData.contacts} 
                    onEditContact={handleContactSubmit}
                    onDeleteContact={handleContactDelete}
                />
                <TimeSettings 
                    initialTime={userData.emailSendTime}
                    initialTimezone={userData.timezone}
                    onTimeChange={handleTimeChange}
                    onTimezoneChange={handleTimezoneChange}
                />
            </VStack>
        </Box>
    );
}

export default UserDisplay;