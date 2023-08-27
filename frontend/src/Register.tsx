import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Stack, Flex, Heading, Text, useColorModeValue, Image } from "@chakra-ui/react";

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        console.log("handling submit");

        // Get the user's timezone, defaulting to 'EST' if not available.
        let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York';

        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, timezone: timezone }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            navigate(`/user/${data.user.id}`, { state: { user: data } })
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <Stack spacing={4} direction={{ base: 'column', md: 'row' }} w={'full'}>
            <Input
                size="lg" // adjust the size
                type={'email'}
                placeholder={'john@doe.net'}
                onChange={(e) => setEmail(e.target.value)}
                color={useColorModeValue('gray.800', 'gray.200')} // gray color
                bg={useColorModeValue('gray.100', 'gray.600')}
                rounded={'full'}
                border={0}
                _focus={{
                    bg: 'white',
                    outline: 'none',
                    borderColor: 'red.400',
                    boxShadow: '0 0 0 3px rgba(255, 102, 102, 0.6)',
                }}
            />
            <Button
                size="lg" // adjust the size
                bg={'red.400'}
                rounded={'full'}
                color={'white'}
                flex={'1 0 auto'}
                _hover={{ bg: 'red.500' }}
                _focus={{ bg: 'red.500' }}
                onClick={handleSubmit}>
                Sign up
            </Button>
        </Stack>
    );
}

export default Register;