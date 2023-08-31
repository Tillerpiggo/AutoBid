'use client'

import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Text,
    Drawer,
    DrawerContent,
    useDisclosure,
    BoxProps,
    FlexProps,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from '@chakra-ui/react'

import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiUsers,
    FiSettings,
    FiMenu,
    FiBell,
    FiChevronDown,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { Route, Routes, Link, useResolvedPath } from 'react-router-dom';
import UserDisplay from './UserDisplay';
import Settings from './Settings';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import userService from './userService';

interface LinkItemProps {
  name: string
  icon: IconType
}

interface NavItemProps extends FlexProps {
  icon: IconType
  children: React.ReactNode
  isSelected: boolean
  onClick: () => void
}

interface MobileProps extends FlexProps {
    onOpen: () => void;
    userEmail: string;
    onProfile: () => void;
    onLogout: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const LinkItems: Array<LinkItemProps> = [
    { name: 'Contacts', icon: FiUsers },
    { name: 'Settings', icon: FiSettings },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    const [selectedItem, setSelectedItem] = useState('Contacts');

    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="Work Sans" fontWeight="bold">
                Gift Sharp.
                </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem
                    key={link.name}
                    icon={link.icon}
                    isSelected={link.name === selectedItem}
                    onClick={() => setSelectedItem(link.name)}
                >
                {link.name}
            </NavItem>
            ))}
        </Box>
    )
}

const NavItem = ({ icon, children, isSelected, onClick, ...rest }: NavItemProps) => {
    const url = useResolvedPath("").pathname;

    return (
        <Box
            as={Link}
            to={children ? `${url}/${children.toString().toLowerCase()}` : '#'}
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}
            onClick={onClick}
        >
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: isSelected ? 'blue.50' : 'white', // Changed to light red
                    color: 'blue.600',
                }}
                bg={isSelected ? 'blue.50' : undefined} // Add background if selected
                color={isSelected ? 'blue.600' : undefined} // Add color if selected
                {...rest}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'blue.600',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Box>
    );
};
  

const MobileNav = ({ userEmail, onOpen, onProfile, onLogout }: MobileProps) => {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 2, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
        >
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text
                display={{ base: 'flex', md: 'none' }}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold">
                Logo
            </Text>

            <HStack spacing={{ base: '0', md: '6' }}>
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                            <HStack>
                                <Avatar
                                    size={'sm'}
                                    src={'https://www.example.com/path/to/pig/picture.jpg'}
                                />
                                <VStack
                                    display={{ base: 'none', md: 'flex' }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2">
                                    <Text fontSize="sm">{userEmail}</Text>
                                    <Text fontSize="xs" color="gray.600">
                                        Gift Extraordinaire
                                    </Text>
                                </VStack>
                                <Box display={{ base: 'none', md: 'flex' }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue('gray.200', 'gray.700')}>
                            <MenuItem onClick={onProfile}>Profile</MenuItem>
                            <MenuItem onClick={onLogout}>Log out</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    )
}

const SidebarWithHeader = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { userId } = useParams();
    const navigate = useNavigate();

    const [userEmail, setUserEmail] = useState("");

    // Fetch user email
    useEffect(() => {
        const fetchUser = async () => {
            const user = await userService.getUser(userId ?? "");
            if (user) {
                setUserEmail(user.email);
            } else {
                setUserEmail("Unknown User");
            }
        }

        fetchUser();
    }, [userId]);

    const onProfile = () => {
        // Do nothing (for now)
    };

    const onLogout = () => {
        navigate("/");
    };

    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen} userEmail={userEmail} onProfile={onProfile} onLogout={onLogout} />
            <Box ml={{ base: 0, md: 200 }} p="12" px="20">
                <Routes>
                    <Route path="contacts" element={<UserDisplay />} />
                    <Route path="settings" element={<Settings />} />
                </Routes>
            </Box>
        </Box>
    );
};
  
export default SidebarWithHeader;