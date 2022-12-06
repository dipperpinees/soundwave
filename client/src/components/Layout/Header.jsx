import { Avatar, Box, Button, Flex, Icon, Menu, MenuButton, MenuItem, MenuList, useMediaQuery } from '@chakra-ui/react';
import { useContext } from 'react';
import { MdOutlineNotifications } from 'react-icons/md';
import { VscTriangleDown } from 'react-icons/vsc';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../stores';
import fetchAPI from '../../utils/fetchAPI';
import SearchInput from '../SearchInput';

export default function Header() {
    const [user, userDispatch] = useContext(UserContext);
    const navigate = useNavigate();
    const [isMobile] = useMediaQuery('(max-width: 48em)');

    async function logOut() {
        fetchAPI('/logout', { method: 'POST' });
        userDispatch({ type: 'Delete' });
        navigate('/signin');
    }

    return (
        <Flex align="center" className="header" color="white" zIndex={10}>
            {!isMobile && (
                <Box width="40%">
                    <SearchInput />
                </Box>
            )}
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
                    <MenuList minWidth={44} border="none">
                        <Link to={`/profile/${user.id}`}>
                            <MenuItem fontSize={14} fontWeight={600}>
                                Profile
                            </MenuItem>
                        </Link>
                        <MenuItem fontSize={14} fontWeight={600} onClick={logOut}>
                            Sign Out
                        </MenuItem>
                    </MenuList>
                </Menu>
            ) : (
                <Box ml="auto">
                    <Link to="/signin">
                        <Button
                            variant="outline"
                            _hover={{ color: 'var(--primary-color)' }}
                            colorScheme="white"
                            size={{ base: 'xs', sm: 'sm' }}
                        >
                            Sign in
                        </Button>
                    </Link>
                    <Link to="/signup">
                        <Button
                            variant="ghost"
                            _hover={{ color: 'var(--primary-color)' }}
                            colorScheme="white"
                            size={{ base: 'xs', sm: 'sm' }}
                        >
                            Sign up
                        </Button>
                    </Link>
                </Box>
            )}
        </Flex>
    );
}
