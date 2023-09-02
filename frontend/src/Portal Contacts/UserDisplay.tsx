import React, { useState, useEffect } from 'react';
import { User, Contact } from '../App/interfaces';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import { useParams } from 'react-router-dom';
import userService from '../Services/userService';
import { FaPlus, FaAddressBook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {
    Box, VStack, Heading, Flex, Button, useDisclosure, Modal, Text,
    ModalOverlay, ModalContent, useMediaQuery, ModalCloseButton, ModalBody, Icon,
    Center, CloseButton, Link
} from '@chakra-ui/react';

const UserDisplay: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const [userData, setUserData] = useState<User | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [showGiftMessage, setShowGiftMessage] = useState(false);

    const [isSmallScreen] = useMediaQuery("(max-width: 600px)");

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
        if (userData && userData.contacts.length === 0) {
            setShowGiftMessage(true);
        }
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

    const doesContactExist = (name: string) => {
        if (!userData) { return false }
        return userData.contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase());
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    const formatDaysLeft = () => {
        if (userData.daysBeforeEmailSend === 14) {
            return "2 weeks"
        } else if (userData.daysBeforeEmailSend === 21) {
            return "3 weeks"
        } else {
            return userData.daysBeforeEmailSend + "days"
        }
    }

    return (
        <Box minHeight="100vh" padding="5">
            {showGiftMessage && 
            <Box textColor="blue.700" position="relative" bg="blue.50" p={5} borderRadius="md" mb={5}>
                <CloseButton position="absolute" right="8px" top="8px" onClick={() => setShowGiftMessage(false)} />
                <Heading size="md" mb={3}>Hooray! 🎉 You're on your way to gift giving greatness.</Heading>
                <Text>Mark your calendar - we'll send personalized gift ideas {formatDaysLeft()} before their birthday. Get ready to see their smile light up the room!</Text>
            </Box>}
            {!showGiftMessage && userData.contacts.length > 0 && 
            <Box textColor="blue.700" bg="blue.50" p={5} borderRadius="md" mb={5}>
                <Heading size="md" mb={3}>All set. 🎁 😎</Heading>
                <Text>{formatDaysLeft()} before each birthday, we'll let you know what to get. </Text>
            </Box>}
            <VStack spacing={8} align="stretch">
                <Flex justifyContent="space-between" width="100%" align="center">
                    <Heading as="h2">Contacts</Heading>
                    <Button colorScheme="blue" onClick={onOpen} size="md" p={2}>
                        <Icon as={FaPlus} />
                        {!isSmallScreen && <Text ml={2}>Add Contact</Text>}
                    </Button>
                </Flex>
                {userData.contacts.length === 0 ? (
                    <Center flexDirection="column">
                        <Icon as={FaAddressBook} boxSize={12} mb={4} color="gray.300" />
                        <Text fontSize="xl" color="gray.500" textAlign="center">
                            Who do you want to surprise?
                        </Text>
                    </Center>
                ) : (
                    <ContactList
                        contacts={userData.contacts} 
                        onEditContact={handleContactSubmit}
                        onPersonalizeContact={handleContactSubmit}
                        onDeleteContact={handleContactDelete}
                    />
                )}
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent maxW="320px">
                        <ModalCloseButton />
                        <ModalBody>
                            <ContactForm onSubmit={handleContactAdd} doesContactExist={doesContactExist} />
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </VStack>
        </Box>
    );
}

export default UserDisplay;