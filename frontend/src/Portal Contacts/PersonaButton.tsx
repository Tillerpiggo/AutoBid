import { Button } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";
import React from "react";

interface PersonaButtonProps {
    onClick: () => void;
    persona: string;
}

const PersonaButton: React.FC<PersonaButtonProps> = ({ onClick, persona }) => {
    const handleOnClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        onClick();
    }

    return (
        persona != "None" ? (
            <Button 
                onClick={handleOnClick} 
                colorScheme="blue" 
                borderRadius="full"
                textColor="blue.600"
                px={4} 
                mr={4} 
                fontSize="sm"
                rightIcon={<FaCheck />}
                bg="blue.50"
                _hover={{ bg: 'blue.100' }}
            >
                Personalized
            </Button>
        ) : (
            <Button
                onClick={handleOnClick}
                colorScheme="blue"
                borderRadius="full"
                textColor="white"
                boxShadow={'0px 1px 25px -5px rgba(16, 112, 202, 0.48), 0 10px 10px -5px rgba(16, 112, 202, 0.43)'}
                px={4}
                mr={4}
                fontSize="sm"
                bg="blue.400"
                _hover={{ bg: 'blue.500' }}
                _focus={{ bg: 'blue.500' }}
            >
            Personalize Suggestions
            </Button>
        )
    )
}

export default PersonaButton