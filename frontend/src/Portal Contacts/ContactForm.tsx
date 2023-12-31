import { Contact } from '../App/interfaces';
import React, { useState, useEffect } from 'react';
import {
    Box,
    Stack,
    Flex,
    Button,
    Input,
    FormControl,
    FormLabel,
    FormHelperText,
    Heading,
    Select,
    Collapse,
    Alert,
    AlertIcon
} from '@chakra-ui/react'

export interface ContactFormProps {
    contact?: Contact;
    onSubmit: (contact: Contact) => Promise<void>;
    doesContactExist: (name: string) => boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ contact, onSubmit, doesContactExist }) => {
    const [name, setName] = useState(contact?.name || "");
    const [birthdayDay, setBirthdayDay] = useState(contact?.birthdayDay || 1); // Default day is 1
    const [birthdayMonth, setBirthdayMonth] = useState(contact?.birthdayMonth || 1); // Default month is 1 (January)
    const [initialState, setInitialState] = useState({ name, birthdayDay, birthdayMonth });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        setInitialState({ name, birthdayDay, birthdayMonth });
    }, [contact]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (event.target.name === 'name') {
            setName(event.target.value);
            // Check if a contact with the new name already exists
            if (doesContactExist(event.target.value)) {
                setShowWarning(true);
            } else {
                setShowWarning(false);
            }
        } else if (event.target.name === 'birthdayDay') {
            setBirthdayDay(Number(event.target.value));
        } else if (event.target.name === 'birthdayMonth') {
            setBirthdayMonth(Number(event.target.value));
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setIsSubmitting(true);

        const newContact: Contact = {
            id: contact?.id || "", 
            name: name,
            birthdayDay: birthdayDay,
            birthdayMonth: birthdayMonth,
            persona: contact?.persona || "None"
        };

        await onSubmit(newContact);
        setIsSubmitting(false);
    };

    const isAddButtonDisabled = !name || !birthdayDay || !birthdayMonth || isSubmitting;
    const isUpdateButtonDisabled = (name === initialState.name && birthdayDay === initialState.birthdayDay && birthdayMonth === initialState.birthdayMonth) || isSubmitting;

    // Array of month names for the dropdown
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <Box
            w={'full'}
            maxW="320px"
            px={4}
            py={8}
            textAlign={'left'}>
            <Heading size="md" mb={6} textAlign="center">{contact ? "Edit Contact" : "Add Contact"}</Heading>
            <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input type="text" name="name" value={name} onChange={handleInputChange} isDisabled={isSubmitting} />
                <Collapse in={showWarning}>
                    <Alert status="warning" mt={2} bg="orange.100" borderRadius="md" alignItems="center">
                        <AlertIcon />
                        <Box fontSize="sm" as="div" color="orange.500" ml={2}>A contact with this name already exists!</Box>
                    </Alert>
                </Collapse>
            </FormControl>
            <FormControl id="birthdayMonth" mt={4}>
                <FormLabel>Birthday Month</FormLabel>
                <Select name="birthdayMonth" value={birthdayMonth} onChange={handleInputChange} isDisabled={isSubmitting}>
                    {months.map((month, index) => (
                        <option key={index} value={index + 1}>
                            {month}
                        </option>
                    ))}
                </Select>
            </FormControl>
            <FormControl id="birthdayDay" mt={4}>
                <FormLabel>Birthday Day</FormLabel>
                <Select name="birthdayDay" value={birthdayDay} onChange={handleInputChange} isDisabled={isSubmitting}>
                    {Array.from({length: 31}, (_, i) => i + 1).map((day) => (
                        <option key={day} value={day}>
                            {day}
                        </option>
                    ))}
                </Select>
            </FormControl>
            <Stack mt={8} direction={'row'} spacing={4}>
                <Button
                    flex={1}
                    fontSize={'sm'}
                    rounded={'full'}
                    type="submit"
                    onClick={handleSubmit}
                    isDisabled={contact ? isUpdateButtonDisabled : isAddButtonDisabled}
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                        bg: 'blue.500',
                    }}
                    _focus={{
                        bg: 'blue.500',
                    }}>
                    {contact ? "Update" : "Add"}
                </Button>
            </Stack>
        </Box>
    )
}

export default ContactForm;