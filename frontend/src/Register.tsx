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
            navigate(`/user/${data.user.id}/contacts`, { state: { user: data } })
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={4} direction={{ base: 'row', md: 'column' }} w={'full'}>
                <Input
                    size="lg"
                    height="60px"
                    type={'email'}
                    placeholder={'Enter email'}
                    onChange={(e) => setEmail(e.target.value)}
                    color={useColorModeValue('gray.800', 'gray.200')}
                    bg={useColorModeValue('gray.100', 'gray.600')}
                    rounded={'full'}
                    border={0}
                    px="5"
                    width="500px"
                    _focus={{
                        bg: 'white',
                        outline: 'none',
                        borderColor: 'blue.400',
                        boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.6)',
                    }}
                />
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
                    Start adding contacts
                </Button>
            </Stack>
        </form>
    );
}
export default Register;