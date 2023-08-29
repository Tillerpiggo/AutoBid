import { Contact } from './interfaces';
import React, { useState, useEffect } from 'react';
import {
    Box,
    Text,
    Stack,
    Button,
    Input,
    FormControl,
    FormLabel,
    Heading,
    useColorModeValue,
} from '@chakra-ui/react'

export interface ContactFormProps {
    contact?: Contact;
    onSubmit: (contact: Contact) => Promise<void>;
}

const ContactForm: React.FC<ContactFormProps> = ({ contact, onSubmit }) => {
    const initialBirthday = contact?.birthday ? new Date(contact.birthday).toISOString().slice(0, 10) : "";
    const [name, setName] = useState(contact?.name || "");
    const [birthday, setBirthday] = useState(initialBirthday);
    const [initialState, setInitialState] = useState({ name, birthday });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setInitialState({ name, birthday });
    }, [contact]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === 'name') {
            setName(event.target.value);
        } else if (event.target.name === 'birthday') {
            setBirthday(event.target.value);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);

        const newContact: Contact = {
            id: contact?.id || "", 
            name: name,
            birthday: new Date(birthday)
        };

        await onSubmit(newContact);
        setIsSubmitting(false);
    };

    const isAddButtonDisabled = !name || !birthday || isSubmitting;
    const isUpdateButtonDisabled = (name === initialState.name && birthday === initialState.birthday) || isSubmitting;

    return (
        <Box
            w={'full'}
            maxW="320px"
            px={4}
            py={8}
            textAlign={'left'}>
            <Heading size="md" mb={6}>{contact ? "Edit Contact" : "Add Contact"}</Heading>
            <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input type="text" name="name" value={name} onChange={handleInputChange} isDisabled={isSubmitting} />
            </FormControl>
            <FormControl id="birthday" mt={4}>
                <FormLabel>Birthday</FormLabel>
                <Input type="date" name="birthday" value={birthday} onChange={handleInputChange} isDisabled={isSubmitting} />
            </FormControl>
            <Stack mt={8} direction={'row'} spacing={4}>
                <Button
                    flex={1}
                    fontSize={'sm'}
                    rounded={'full'}
                    type="submit"
                    onClick={handleSubmit}
                    isDisabled={contact ? isUpdateButtonDisabled : isAddButtonDisabled}
                    bg={'red.400'}
                    color={'white'}
                    _hover={{
                        bg: 'red.500',
                    }}
                    _focus={{
                        bg: 'red.500',
                    }}>
                    {contact ? "Update" : "Add"}
                </Button>
            </Stack>
        </Box>
    )
}

export default ContactForm;