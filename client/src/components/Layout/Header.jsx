import {
    Avatar,
    Box,
    Button,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    VStack
} from '@chakra-ui/react';
import queryString from 'query-string';
import { useContext, useEffect, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../stores';
import fetchAPI from '../../utils/fetchAPI';

export default function Header() {
    const [user, userDispatch] = useContext(UserContext);
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        document.addEventListener('click', () => {
            setShowSearchDropdown(false);
        });
    }, []);

    if (location.pathname === '/signin' || location.pathname === '/signup') return null;

    async function logOut() {
        fetchAPI('/logout', { method: 'POST' });
        userDispatch({ type: 'Delete' });
    }

    const handleSearch = () => {
        if (location.pathname.startsWith('/search')) {
            const queryParams = queryString.parse(location.search);
            queryParams.q = searchInput;
            navigate({
                path: location.pathname,
                search: queryString.stringify(queryParams),
            });
        } else {
            navigate(`/search/?q=${searchInput}`);
        }
        setShowSearchDropdown(false);
    };

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
                            <MenuItem _focus={{ color: 'var(--primary-color)' }} _active={{}}>
                                Profile
                            </MenuItem>
                        </Link>
                        <MenuItem _focus={{ color: 'var(--primary-color)' }} _active={{}} onClick={logOut}>
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
                        onChange={(e) => {
                            setSearchInput(e.target.value);
                            setShowSearchDropdown(!!e.target.value);
                        }}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                </InputGroup>
                {showSearchDropdown && (
                    <VStack
                        align="stretch"
                        position={'absolute'}
                        right={-3}
                        left={1}
                        top={38}
                        bgColor="blackAlpha.800"
                        borderRadius={8}
                    >
                        <Flex h="40px" align={'center'} paddingLeft={4} onClick={handleSearch}>
                            Search for "{searchInput}"
                        </Flex>
                    </VStack>
                )}
            </Box>
        </Flex>
    );
}
