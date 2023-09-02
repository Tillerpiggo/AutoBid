import { Persona } from '../App/interfaces';
import PersonaItem from './PersonaItem';
import PersonaForm from './PersonaForm';
import React, { useState } from 'react';
import { VStack, Box, Modal, ModalOverlay, ModalContent, ModalBody, useDisclosure } from '@chakra-ui/react';

interface PersonaListProps {
    personas: Persona[];
    onEditPersona: (persona: Persona) => Promise<void>;
    onDeletePersona: (id: string) => Promise<void>;
}

const PersonaList: React.FC<PersonaListProps> = ({ personas, onEditPersona, onDeletePersona }) => {
    const [selectedPersona, setSelectedPersona] = useState<Persona | undefined>(undefined);

    const editDisclosure = useDisclosure();

    const openEditModal = async (persona: Persona) => {
        setSelectedPersona(persona);
        editDisclosure.onOpen();
    };

    const handleEditPersona = async (persona: Persona) => {
        await onEditPersona(persona);
        editDisclosure.onClose();
    }

    const handleDeletePersona = async () => {
        await onDeletePersona(selectedPersona!.id);
    }

    const doesPersonaExist = (name: string) => {
        return personas.some(p => p.name === name)
    }

    return (
        <Box width="full" borderRadius="2xl">
            <VStack spacing={2} alignItems="stretch" justifyContent="flex-start">
                {personas && personas.map((persona, index) => (
                    <Box zIndex={personas.length - index} key={persona.id}>
                        <PersonaItem
                            persona={persona}
                            onEdit={() => openEditModal(persona)}
                            onDelete={() => onDeletePersona(persona.id)}
                        />
                    </Box>
                ))}
            </VStack>
            <Modal isOpen={editDisclosure.isOpen} onClose={editDisclosure.onClose}>
                <ModalOverlay />
                <ModalContent maxW="320px">
                    <ModalBody>
                        <PersonaForm
                            persona={selectedPersona!} 
                            onSubmit={handleEditPersona} 
                            doesPersonaExist={doesPersonaExist}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default PersonaList;