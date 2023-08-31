import React, { useState } from 'react';
import { Contact } from './interfaces';
import { Box, RadioGroup, Radio, VStack, Button, Heading } from '@chakra-ui/react';

interface PersonaFormProps {
    contact: Contact;
    onSubmit: (updatedContact: Contact) => Promise<void>;
}

const PersonaForm: React.FC<PersonaFormProps> = ({ contact, onSubmit }) => {
    const [persona, setPersona] = useState<string>(contact.persona === "None" ? "" : contact.persona);
  
    const options = [
        "Home Goods Lover",
        "The Active Person",
        "In The Kitchen",
        "Cocktail & Beverage Enthusiast",
        "Self care aficionado",
        "Game Night",
        "All Things Functional"
    ];
  
    const handleChange = (value: string) => {
        setPersona(value);
    };
  
    const handleSubmit = async () => {
        contact.persona = persona
        await onSubmit(contact);
    };
  
    return (
        <Box
            px={4}
            py={8}
        >
            <Heading size="md" mb={6} textAlign="center">{`What fits ${contact.name}?`}</Heading>
            <RadioGroup onChange={handleChange} value={persona}>
            <VStack spacing={4} align="start">
                {options.map(option => (
                <Radio key={option} value={option}>
                    {option}
                </Radio>
                ))}
            </VStack>
            </RadioGroup>
            <Button mt={8} colorScheme="blue" onClick={handleSubmit}>
                Set Persona
            </Button>
        </Box>
    );
}

export default PersonaForm