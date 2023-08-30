import { Box, Button, Flex, Heading, HStack, Tag, Text, useColorModeValue, Avatar, Badge } from '@chakra-ui/react';
import React from 'react';
import ContactOptions from './ContactOptions';
import { Contact } from './interfaces';
import DateService from './dateService';

interface ContactDetailProps {
    contact: Contact;
    onEdit: () => void;
    onDelete: () => void;
}

const ContactDetail: React.FC<ContactDetailProps> = ({ contact, onEdit, onDelete }) => {
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
                >
                    #art
                </Badge>
                <Badge
                    px={2}
                    py={1}
                    bg={useColorModeValue('gray.50', 'gray.800')}
                    fontWeight={'400'}
                >
                    #science
                </Badge>
            </HStack>

            <Button
                mt={8}
                w={"full"}
                fontSize={'sm'}
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                boxShadow={
                    '0px 1px 25px -5px rgba(16, 112, 202, 0.48), 0 10px 10px -5px rgba(16, 112, 202, 0.43)'
                }
                _hover={{
                    bg: 'blue.500',
                }}
                _focus={{
                    bg: 'blue.500',
                }}
            >
                Personalize Suggestions
            </Button>
        </Box>
    );
}

export default ContactDetail;