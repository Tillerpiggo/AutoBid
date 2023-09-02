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
    MenuItem,
    MenuList,
    useBreakpointValue
} from '@chakra-ui/react'

import {
    FiMenu,
    FiChevronDown,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ReactNode, useState, useEffect } from 'react';
import userService from '../Services/userService';

interface SidebarItem {
    name: string;
    icon: IconType;
    route: string; 
}

interface SidebarProps extends BoxProps {
    items: SidebarItem[];
    onClose: () => void;
    logoText: string;
}

const SidebarContent = ({ onClose, items, logoText, ...rest }: SidebarProps) => {
    const [selectedItem, setSelectedItem] = useState(items[0].name);

    return (
        <Box
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="Work Sans" fontWeight="bold">
                {logoText}
                </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {items.map((item) => (
                <NavItem
                    key={item.name}
                    icon={item.icon}
                    route={item.route}
                    isSelected={item.name === selectedItem}
                    onClick={() => setSelectedItem(item.name)}
                >
                {item.name}
            </NavItem>
            ))}
        </Box>
    )
}

interface NavItemProps extends FlexProps {
    icon: IconType
    children: React.ReactNode
    isSelected: boolean
    route: string
    onClick: () => void
}

const NavItem = ({ icon, children, isSelected, onClick, route, ...rest }: NavItemProps) => {
    return (
        <Box
            as={Link}
            to={route}
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
                    bg: isSelected ? 'blue.50' : 'white',
                    color: 'blue.600',
                }}
                bg={isSelected ? 'blue.50' : undefined}
                color={isSelected ? 'blue.600' : undefined}
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

interface MobileProps extends FlexProps {
    onOpen: () => void;
    username: string;
    userRole: string;
    onLogout: () => void;
}

const MobileNav = ({ onOpen, username, userRole, onLogout }: MobileProps) => {

    const onProfile = () => {
        // Do nothing (for now)
    };

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
                                    ml="2"
                                >
                                    <Text fontSize="sm">{username}</Text>
                                    <Text fontSize="xs" color="gray.600">{userRole}</Text>
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

interface SidebarWithHeaderProps {
    items: SidebarItem[];
    logoText: string;
    username?: string;
    userRole: string;
    onLogoutRoute: string;
    children: ReactNode;
}

export const SidebarWithHeader = ({
    items,
    logoText,
    username,
    userRole,
    onLogoutRoute,
    children,
}: SidebarWithHeaderProps) => {
    const { isOpen: isMobileNavOpen, onOpen: onMobileNavOpen, onClose: onMobileNavClose } = useDisclosure();
    const { isOpen: isSidebarOpen, onOpen: onSidebarOpen, onClose: onSidebarClose } = useDisclosure();
    const isDesktop = useBreakpointValue({ base: false, md: true });
    const navigate = useNavigate();
    
    const { userId } = useParams<{ userId: string }>();
    const [userEmail, setUserEmail] = useState("");

    const handleLogout = () => {
        navigate(onLogoutRoute);
    }

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

    useEffect(() => {
        if (isDesktop) {
            onSidebarOpen();
        } else {
            onSidebarClose();
        }
    }, [isDesktop, onSidebarOpen, onSidebarClose]);

    let displayName = username || userEmail;

    const sidebarWidth = '60';
    const childrenPadding = isSidebarOpen ? sidebarWidth : '0';

    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')} >
            <SidebarContent
                onClose={onSidebarClose}
                items={items}
                logoText={logoText}
            />
            <Drawer
                autoFocus={false}
                isOpen={isMobileNavOpen}
                placement="left"
                onClose={onMobileNavClose}
                returnFocusOnClose={false}
                onOverlayClick={onMobileNavClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onMobileNavClose} items={items} logoText={logoText} />
                </DrawerContent>
            </Drawer>
            <MobileNav onOpen={onMobileNavOpen} username={displayName} userRole={userRole} onLogout={handleLogout} />
            <Box pl={{ md: childrenPadding }} pt="6" pb="4">
                <Box px="6">
                    {children}
                </Box>
            </Box>
        </Box>
    );
};
  
export default SidebarWithHeader;