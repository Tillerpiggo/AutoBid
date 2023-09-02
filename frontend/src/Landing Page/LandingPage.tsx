'use client'

import React from 'react';
import Register from './Register';
import { Box, Container, Heading, Stack, Text, Image } from '@chakra-ui/react';

const LandingPage: React.FC = () => {
    const bgColor = 'white';
    return (
        <Box bg={bgColor}>
            <Container maxW={'3xl'}>
                <Stack
                    as={Box}
                    textAlign={'center'}
                    spacing={{ base: 8, md: 16 }}
                    py={{ base: 20, md: 36 }}>
                    <Stack spacing={{ md: 12 }}>
                        <Heading
                            fontWeight={700}
                            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                            lineHeight={'110%'}>
                            Be the gift giver <br />
                            <Text as={'span'} color={'blue.400'}>
                                everybody loves
                            </Text>
                        </Heading>
                    </Stack>
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