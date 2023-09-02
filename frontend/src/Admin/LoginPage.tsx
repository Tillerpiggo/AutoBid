import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Stack, Tooltip, useColorModeValue } from "@chakra-ui/react";
import useAuth from './auth'; 

const LoginPage: React.FC = () => {
    console.log("Showing login page");

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showTooltip, setShowTooltip] = useState<boolean>(false);
    const navigate = useNavigate();

    const { signIn } = useAuth();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
    
        // Check if the email or password is empty
        if (!email || !password) {
            setShowTooltip(true);
            return;
        }
    
        signIn(email, password)
            .then((user) => {
                console.log("User signed in: ", user);
                // navigate to admin page
                navigate('/admin');
            })
            .catch((error) => {
                console.log("Error: ", error.code, error.message);
                setShowTooltip(true);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={4} direction={{ base: 'row', md: 'column' }} w={'full'}>

            <Tooltip label="Please enter an email." isOpen={showTooltip} hasArrow>
                <Input
                    size="lg"
                    height="60px"
                    type={'email'}
                    placeholder={'Enter email'}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setShowTooltip(false);
                    }}
                    color={useColorModeValue('gray.800', 'gray.200')}
                    bg={useColorModeValue('gray.100', 'gray.600')}
                    rounded={'full'}
                    border={0}
                    px="5"
                    _focus={{
                        bg: 'white',
                        outline: 'none',
                        borderColor: 'blue.400',
                        boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.6)',
                    }}
                />
            </Tooltip>

            <Tooltip label="Please enter a password." isOpen={showTooltip} hasArrow>
                <Input
                    size="lg"
                    height="60px"
                    type={'password'}
                    placeholder={'Enter password'}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setShowTooltip(false);
                    }}
                    color={useColorModeValue('gray.800', 'gray.200')}
                    bg={useColorModeValue('gray.100', 'gray.600')}
                    rounded={'full'}
                    border={0}
                    px="5"
                    _focus={{
                        bg: 'white',
                        outline: 'none',
                        borderColor: 'blue.400',
                        boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.6)',
                    }}
                />
            </Tooltip>

                <Button
                    size="lg"
                    height="60px"
                    bg={'blue.400'}
                    rounded={'full'}
                    color={'white'}
                    flex={'1 0 auto'}
                    _hover={{ bg: 'blue.500' }}
                    _focus={{ bg: 'blue.500' }}
                    type="submit">
                    Log In
                </Button>

            </Stack>
        </form>
    );
}

export default LoginPage;