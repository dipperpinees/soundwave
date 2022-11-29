import {
    Avatar,
    Box,
    Button,
    Flex,
    Icon, Menu,
    MenuButton,
    MenuItem,
    MenuList
} from '@chakra-ui/react';
import { useContext } from 'react';
import { MdOutlineNotifications } from 'react-icons/md';
import { VscTriangleDown } from 'react-icons/vsc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../stores';
import fetchAPI from '../../utils/fetchAPI';
import SearchInput from '../SearchInput';

export default function Header() {
    const [user, userDispatch] = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();

    if (location.pathname === '/signin' || location.pathname === '/signup') return null;

    async function logOut() {
        fetchAPI('/logout', { method: 'POST' });
        userDispatch({ type: 'Delete' });
        navigate('/signin');
    }


    return (
        <Flex alignItems="center" className="header" color="white" zIndex={10}>
            <Box width="50%">
                <SearchInput />
            </Box>
            {!!user.id && <Icon as={MdOutlineNotifications} fontSize={20} ml="auto" />}
            {!!user.id ? (
                <Menu>
                    <MenuButton>
                        <Flex align="center">
                            <Avatar
                                className="header-avatar"
                                size="sm"
                                name={user.name}
                                alt={user.name}
                                src={user.avatar}
                                margin={2}
                            />
                            <VscTriangleDown />
                        </Flex>
                    </MenuButton>
                    <MenuList minWidth={44} bgColor="blackAlpha.900" border="none">
                        <Link to={`/profile/${user.id}`} _hover={{}}>
                            <MenuItem _focus={{ color: 'var(--primary-color)' }} _active={{}} _hover={{}}>
                                Profile
                            </MenuItem>
                        </Link>
                        <MenuItem _focus={{ color: 'var(--primary-color)' }} _active={{}} onClick={logOut} _hover={{}}>
                            Sign Out
                        </MenuItem>
                    </MenuList>
                </Menu>
            ) : (
                <Box ml="auto">
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
                </Box>
            )}
        </Flex>
    );
}
