import React, { useState } from 'react';
import { Persona } from '../App/interfaces';
import { Box, Button, Heading, Alert, AlertIcon, FormControl, FormLabel, Input, Collapse } from '@chakra-ui/react';

interface PersonaFormProps {
    persona: Persona | null;
    onSubmit: (updatedPersona: Persona) => Promise<void>;
    doesPersonaExist: (name: string) => boolean;
}

const PersonaForm: React.FC<PersonaFormProps> = ({ persona, onSubmit, doesPersonaExist }) => {
    const [personaName, setPersonaName] = useState<string>(persona ? persona.name : '');
    const [showWarning, setShowWarning] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (doesPersonaExist(value)) {
            setShowWarning(true);
        } else {
            setShowWarning(false);
        }
        setPersonaName(value);
    };
  
    const handleSubmit = async () => {
        if (!showWarning) {
            const updatedPersona: Persona = { id: persona ? persona.id : "id will be created in backend", name: personaName }
            await onSubmit(updatedPersona);
        }
    };
  
    return (
        <Box px={4} py={8}>
            <Heading size="md" mb={6} textAlign="center">{`${persona ? 'Edit' : 'Add'} 'Persona'`}</Heading>
            <FormControl id="persona-name">
                <FormLabel>Persona Name</FormLabel>
                <Input type="text" value={personaName} onChange={handleChange} />
            </FormControl>
            <Collapse in={showWarning}>
                <Alert status="warning" mt={2} bg="orange.100" borderRadius="md" alignItems="center">
                    <AlertIcon />
                    <Box fontSize="sm" as="div" color="orange.500" ml={2}>A persona with this name already exists!</Box>
                </Alert>
            </Collapse>
            <Button mt={8} colorScheme="blue" onClick={handleSubmit} isDisabled={showWarning || personaName === ''}>
                Submit
            </Button>
        </Box>
    );
}

export default PersonaForm;