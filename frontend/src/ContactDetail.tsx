import { Box, Button, Flex, Heading, HStack, Center, Text, useColorModeValue, Avatar, Badge } from '@chakra-ui/react';
import React from 'react';
import ContactOptions from './ContactOptions';
import { Contact } from './interfaces';
import DateService from './dateService';
import PersonaButton from './PersonaButton';

interface ContactDetailProps {
    contact: Contact;
    onEdit: () => void;
    onPersonalize: () => void;
    onDelete: () => void;
}

const ContactDetail: React.FC<ContactDetailProps> = ({ contact, onEdit, onPersonalize, onDelete }) => {
    return (
        <Box
            maxW={"320px"}
            w={"full"}
            bg={useColorModeValue("white", "gray.900")}
            rounded={"lg"}
            p={6}
            textAlign={"center"}
            position="relative"
        >
            <Flex
                position="absolute"
                top={4}
                right={4}
            >
                <ContactOptions onEdit={onEdit} onDelete={onDelete} />
            </Flex>

            <Avatar
                size={"xl"}
                src={"https://example.com/path-to-profile-pic.jpg"}
                mb={4}
            />

            <Heading fontSize={"2xl"} fontFamily={"body"}>
                {contact.name}
            </Heading>
            <Text fontWeight={600} color={"gray.500"} mb={4}>
                {DateService.getFormattedDate(contact.birthdayDay, contact.birthdayMonth)}
            </Text>

            <HStack spacing={4} justify="center" align="center">
                <Badge
                    px={2}
                    py={1}
                    bg={useColorModeValue('gray.50', 'gray.800')}
                    fontWeight={'400'}
                    textTransform={"none"}
                >
                    {contact.persona === "None" ? "Loves Everything" : contact.persona}
                </Badge>
            </HStack>
            <Center mt={8} w={"full"} >
                <PersonaButton persona={contact.persona} onClick={onPersonalize} />
            </Center>
        </Box>
    );
}

export default ContactDetail;