import { Button, Flex, Image, ButtonProps } from '@chakra-ui/react'

interface GrayButtonProps extends ButtonProps {
    label: string;
    handleClick: () => void;
}

const GrayButton: React.FC<GrayButtonProps> = ({ label, handleClick, ...props }) => {
    
    return (
        <Flex justifyContent="center" alignItems="center">
        <Button
            px={4}
            fontSize={'sm'}
            rounded={'md'}
            bg={'gray.200'}
            color={'gray.800'}
            onClick={handleClick}
            _hover={{
                bg: 'gray.300',
            }}
            _focus={{
                bg: 'gray.300',
            }}
            {...props}
        >
            {label}
        </Button>
        </Flex>
    )
}

export default GrayButton;