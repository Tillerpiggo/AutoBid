import { Friend } from './interfaces';
import React, { useState, useEffect } from 'react';
import {
    Box,
    Center,
    Text,
    Stack,
    Button,
    Input,
    FormControl,
    FormLabel,
    useColorModeValue,
} from '@chakra-ui/react'

export interface FriendFormProps {
    friend?: Friend;
    onSubmit: (friend: Friend) => Promise<void>;
    onDelete?: (friendId: string) => Promise<void>;
}

const FriendForm: React.FC<FriendFormProps> = ({ friend, onSubmit, onDelete }) => {
    const initialBirthday = friend?.birthday ? new Date(friend.birthday).toISOString().slice(0, 10) : "";
    const [name, setName] = useState(friend?.name || "");
    const [birthday, setBirthday] = useState(initialBirthday);
    const [initialState, setInitialState] = useState({ name, birthday });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setInitialState({ name, birthday });
    }, [friend]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === 'name') {
            setName(event.target.value);
        } else if (event.target.name === 'birthday') {
            setBirthday(event.target.value);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);

        const newFriend: Friend = {
            id: friend?.id || "", 
            name: name,
            birthday: new Date(birthday)
        };

        await onSubmit(newFriend);
        setIsSubmitting(false);
    };

    const handleDelete = async () => {
        if(onDelete && friend?.id) {
            setIsSubmitting(true);
            await onDelete(friend.id);
            setIsSubmitting(false);
        }
    };

    const isAddButtonDisabled = !name || !birthday || isSubmitting;
    const isUpdateButtonDisabled = (name === initialState.name && birthday === initialState.birthday) || isSubmitting;

    return (
        <Center py={6}>
            <Box
                maxW={'320px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}>
                <FormControl id="name" isRequired>
                    <FormLabel>Name:</FormLabel>
                    <Input type="text" name="name" value={name} onChange={handleInputChange} isDisabled={isSubmitting} />
                </FormControl>
                <FormControl id="birthday" isRequired mt={4}>
                    <FormLabel>Birthday:</FormLabel>
                    <Input type="date" name="birthday" value={birthday} onChange={handleInputChange} isDisabled={isSubmitting} />
                </FormControl>
                <Stack mt={8} direction={'row'} spacing={4}>
                    <Button
                        flex={1}
                        fontSize={'sm'}
                        rounded={'full'}
                        type="submit"
                        onClick={handleSubmit}
                        isDisabled={friend ? isUpdateButtonDisabled : isAddButtonDisabled}
                        bg={'red.400'}
                        color={'white'}
                        _hover={{
                            bg: 'red.500',
                        }}
                        _focus={{
                            bg: 'red.500',
                        }}>
                        {friend ? "Update" : "Add"}
                    </Button>
                    {friend && onDelete &&
                    <Button
                        flex={1}
                        fontSize={'sm'}
                        rounded={'full'}
                        bg={'red.400'}
                        color={'white'}
                        onClick={handleDelete}
                        isDisabled={isSubmitting}
                        _hover={{
                            bg: 'red.500',
                        }}
                        _focus={{
                            bg: 'red.500',
                        }}>
                        Delete
                    </Button>}
                </Stack>
            </Box>
        </Center>
    )
}

export default FriendForm;