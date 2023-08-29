'use strict'

import React from 'react';
import {
    Popover, 
    PopoverTrigger, 
    PopoverContent, 
    PopoverBody, 
    PopoverArrow, 
    IconButton, 
    Button, 
    Stack, 
    Flex 
} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { RiPencilLine, RiDeleteBin6Line } from 'react-icons/ri';

interface ContactOptionsProps {
    onEdit: () => void;
    onDelete: () => void;
}

const ContactOptions: React.FC<ContactOptionsProps> = ({ onEdit, onDelete }) => {
    const handleIconButtonClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    return (
        <Flex justifyContent="center">
            <Popover placement="bottom" isLazy>
                <PopoverTrigger>
                    <IconButton
                        aria-label="More contact options"
                        icon={<BsThreeDotsVertical />}
                        variant="solid"
                        w="fit-content"
                        onClick={handleIconButtonClick}
                    />
                </PopoverTrigger>
                <PopoverContent zIndex={10} w="fit-content" _focus={{ boxShadow: 'none' }}>
                    <PopoverArrow />
                    <PopoverBody>
                        <Stack>
                            <Button
                                w="194px"
                                variant="ghost"
                                rightIcon={<RiPencilLine />}
                                justifyContent="space-between"
                                fontWeight="normal"
                                fontSize="sm"
                                onClick={onEdit}
                            >
                                Edit Contact
                            </Button>
                            <Button
                                w="194px"
                                variant="ghost"
                                rightIcon={<RiDeleteBin6Line />}
                                justifyContent="space-between"
                                fontWeight="normal"
                                colorScheme="red"
                                fontSize="sm"
                                onClick={onDelete}
                            >
                                Delete Contact
                            </Button>
                        </Stack>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Flex>
    )
}

export default ContactOptions;