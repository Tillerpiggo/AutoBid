import { useParams } from 'react-router-dom';
import { User } from '../App/interfaces';
import { Button, Image, Box, Text, Heading, Container, Stack, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import userService from '../Services/userService';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';

const CongratulationsPage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();
    const [width, height] = useWindowSize();

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) {
                console.error('No user ID provided');
                return;
            }
            const user = await userService.getUser(userId);
            setUser(user);
        };
    
        fetchUserData();
    }, [userId]);

    if (!user) { 
        return (
            <Alert status="error">
                <AlertIcon />
                <AlertTitle mr={2}>Registration Failed!</AlertTitle>
                <AlertDescription>Your account was not properly registered. Please try again.</AlertDescription>
            </Alert>
        )
    }

    const handleButtonClick = () => {
        navigate(`/user/${user.id}/contacts`, { state: { user } })
    }

    return (
        <Box bg="white" textAlign="center">
            <Confetti width={width} height={height} />
            <Container maxW='2xl'>
                <Stack as={Box} spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
                    <Heading
                            fontWeight={700}
                            fontFamily="Work Sans"
                            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                            lineHeight={'110%'}>
                        Welcome aboard, <Text as='span' color='blue.400'>{user.email}!</Text>
                    </Heading>
                    <Text textColor="gray.600" fontSize={{ base: 'lg', md: 'xl' }}>With caring folks like you, the world is a brighter place. Thank you for joining!</Text>
                    {/* <Image src={`${process.env.PUBLIC_URL}/public/images/paper-airplanpeg`} boxSize="300px" objectFit="cover" my={4} /> */}
                    <Button colorScheme="blue" mt={4} onClick={handleButtonClick}>Let's get started!</Button>
                </Stack>
            </Container>
        </Box>
    );
};

export default CongratulationsPage;