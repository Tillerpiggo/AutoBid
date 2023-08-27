'use client'

import React from 'react';
import Register from './Register';
import { Box, Center, Container, Heading, Stack, Text, Button, useColorModeValue, Image, Flex, Avatar } from '@chakra-ui/react';

const LandingPage: React.FC = () => {
    const bgColor = 'white';
    return (
        <Box bg={bgColor}>
            <Container maxW={'3xl'}>
                <Stack
                    as={Box}
                    textAlign={'center'}
                    spacing={{ base: 8, md: 14 }}
                    py={{ base: 20, md: 36 }}>
                    <Heading
                        fontWeight={700}
                        fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                        lineHeight={'110%'}>
                        Thoughtful gifts <br />
                        <Text as={'span'} color={'red.400'}>
                            made easy
                        </Text>
                    </Heading>
                    <Text fontSize={'xl'} color={'gray.500'}>
                        Fantastic gift suggestions, right on time.
                    </Text>
                    <Stack
                        direction={'column'}
                        spacing={3}
                        align={'center'}
                        alignSelf={'center'}
                        position={'relative'}>
                    <Register />
                    </Stack>
                </Stack>
            </Container>
        </Box>
    )
}

export default LandingPage;