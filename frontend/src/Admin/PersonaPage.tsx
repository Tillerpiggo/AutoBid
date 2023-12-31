import React, { useState, useEffect } from 'react';
import { Box, Heading, Spinner, Flex, Text, Button, Icon, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, useDisclosure } from '@chakra-ui/react';
import { Persona } from '../App/interfaces';
import PersonaForm from './PersonaForm';
import PersonaList from './PersonaList';
import adminService from '../Services/adminService';
import { FaPlus } from 'react-icons/fa';

const PersonaPage: React.FC = () => {
    const [personas, setPersonas] = useState<Persona[] | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const fetchPersonas = async () => {
            const response = await adminService.getAllPersonas();
            setPersonas(response);
        };

        fetchPersonas();
    }, []);

    const doesPersonaExist = (name: string) => {
        return !!personas?.find(persona => persona.name === name);
    };

    const handleEdit = async (updatedPersona: Persona) => {
        console.log('Starting handleEdit with:', updatedPersona); // Print the input
    
        const response = await adminService.updatePersona(updatedPersona.id, updatedPersona.name);
        console.log('Received response:', response); // Print the response
    
        if (response && personas) {
            console.log('Updating personas list...'); // Print message before starting update
            
            const updatedPersonas = personas.map(persona =>
                persona.id === updatedPersona.id ? updatedPersona : persona
            );
    
            console.log('Updated personas list:', updatedPersonas); // Print the updated list
    
            setPersonas(updatedPersonas);
        } else {
            console.log('Did not update personas - response or personas was falsy:', {response, personas}); // Print a message if no update happened
        }
    };

    const handleDelete = async (personaId: string) => {
        const deletedPersona = await adminService.deletePersona(personaId);

        if (deletedPersona && personas) {
            const updatedPersonas = personas.filter(persona => persona.id !== personaId);
            setPersonas(updatedPersonas);
        }
    };

    const handleAdd = async (newPersona: Persona) => {
        const addedPersona = await adminService.addPersona(newPersona);
    
        if (addedPersona && personas) {
            setPersonas([...personas, addedPersona]);
        }

        onClose();
    };

    if (!personas) {
        return <Spinner />;
    }

    return (
        <Box px={4} py={8}>
            <Flex justifyContent="space-between" width="100%" align="center" pb="6">
                <Heading size="lg">Personas</Heading>
                <Button onClick={onOpen} colorScheme="blue" size="md" p={2}>
                    <Icon as={FaPlus} />
                    <Text ml={2}>Add Persona</Text>
                </Button>
            </Flex>
            <PersonaList personas={personas} onEditPersona={handleEdit} onDeletePersona={handleDelete} />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <PersonaForm persona={null} onSubmit={handleAdd} doesPersonaExist={doesPersonaExist} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default PersonaPage;