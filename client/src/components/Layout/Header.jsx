import {
    Avatar,
    Box,
    Button,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    Menu,
    MenuButton, MenuItem,
    MenuList, VStack
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';
import { API_ENDPOINT } from '../../config';
import { UserContext } from '../../stores';

export default function Header() {
    const [user, userDispatch] = useContext(UserContext);
    const [input, setInput] = useState('');
    const location = useLocation();
    if (location.pathname === '/signin' || location.pathname === '/signup') return null;

    async function logOut() {
        await fetch(API_ENDPOINT + '/logout', {
            method: 'POST',
            credentials: 'include',
        });
        userDispatch({ type: 'Delete' });
    }

    return (
        <Flex alignItems="center" className="header" color="white" zIndex={3}>
            {!!user.id ? (
                <Menu>
                    <MenuButton>
                        <Avatar
                            className="header-avatar"
                            size="md"
                            name={user.name}
                            alt={user.name}
                            src={user.avatar}
                        />
                    </MenuButton>
                    <MenuList minWidth={44} bgColor="blackAlpha.900" border="none">
                        <Link to="/profile" _hover={{}}>
                            <MenuItem _focus={{ color: 'var(--primary-color)' }}>Profile</MenuItem>
                        </Link>
                        <MenuItem _focus={{ color: 'var(--primary-color)' }} onClick={logOut}>
                            Sign Out
                        </MenuItem>
                    </MenuList>
                </Menu>
            ) : (
                <>
                    <Link to="/signin" _hover={{}}>
                        <Button variant="outline" _hover={{ color: 'var(--primary-color)' }} colorScheme="white">
                            Sign in
                        </Button>
                    </Link>
                    <Link to="/signup">
                        <Button variant="ghost" _hover={{ color: 'var(--primary-color)' }} colorScheme="white">
                            Sign up
                        </Button>
                    </Link>
                </>
            )}
            <Box position={'relative'} width="50%">
                <InputGroup width="100%" marginLeft="8px" size="sm">
                    <InputLeftElement pointerEvents="none" children={<BiSearchAlt color="gray.300" />} />
                    <Input
                        type="tel"
                        placeholder="Search for artists, song,..."
                        borderRadius="40px"
                        size="sm"
                        onChange={(e) => setInput(e.target.value)}
                    />
                </InputGroup>
                {input !== '' && (
                    <VStack
                        align="stretch"
                        position={'absolute'}
                        right={-3}
                        left={1}
                        top={38}
                        bgColor="blackAlpha.600"
                        borderRadius={8}
                    >
                        <Flex h="40px" align={'center'} paddingLeft={4}>
                            Search 1 abc xyz ghk umn
                        </Flex>
                        <Flex h="40px" align={'center'} paddingLeft={4}>
                            Search 2 abc xyz ghk umn
                        </Flex>
                        <Flex h="40px" align={'center'} paddingLeft={4}>
                            Search 3 abc xyz ghk umn
                        </Flex>
                    </VStack>
                )}
            </Box>
        </Flex>
    );
}
