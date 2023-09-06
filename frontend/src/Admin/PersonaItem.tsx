import { Persona } from '../App/interfaces';
import { Box, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import OptionsButton from '../Components/OptionsButton';

interface PersonaItemProps {
    persona: Persona;
    onEdit: (persona: Persona) => void;
    onDelete: (id: string) => Promise<void>;
}

const PersonaItem: React.FC<PersonaItemProps> = ({
    persona,
    onDelete,
    onEdit,
}) => {

    const handleDelete = () => {
        onDelete(persona.id);
    };

    const handleEdit = () => {
        onEdit(persona);
    };

    return (
        <Box
            width="full"
            backgroundColor={useColorModeValue('white', 'gray.900')}
            borderRadius="xl"
            padding={6}
            _hover={{
                bg: useColorModeValue('white', 'gray.900'),
                transform: 'scale(1.02)',
                boxShadow: '2xl',
            }}
            transition="all 0.2s"
            onClick={handleEdit}
        >
            <Stack direction="row" justify="space-between" align="center">
                <Stack direction="column" spacing={0} fontSize="sm">
                    <Text fontWeight={600}>{persona.name}</Text>
                    <Text color="gray.500">{persona.id}</Text>
                </Stack>
                <OptionsButton onEdit={handleEdit} onDelete={handleDelete} itemLabel="Persona" />
            </Stack>
        </Box>
    );
}

export default PersonaItem;