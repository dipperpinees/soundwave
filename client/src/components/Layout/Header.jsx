import {
    Button,
    Avatar,
    MenuList,
    MenuItem,
    Menu,
    MenuButton,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { API_ENDPOINT } from '../../config';
import { UserContext } from '../../stores';

export default function Header() {
    const [user, userDispatch] = useContext(UserContext);

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

            {/* <IoIosArrowBack className="header-back" /> */}
            {/* <IoIosArrowForward className="header-forward" /> */}
            <InputGroup width="50%" marginLeft="8px" size="sm">
                <InputLeftElement pointerEvents="none" children={<BiSearchAlt color="gray.300" />} />
                <Input type="tel" placeholder="Search for artists, song,..." borderRadius="40px" size="sm" />
            </InputGroup>
        </Flex>
    );
}
