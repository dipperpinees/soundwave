import { Avatar, Button, Flex, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react';
import { useContext } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Link, NavLink, useLocation } from 'react-router-dom';
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
            <Menu _hover={{}}>
                <MenuButton _hover={{}}>
                    <Avatar className="header-avatar" size="md" name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
                </MenuButton>
                <MenuList bgColor={"blackAlpha.800"} color="white" minWidth={44} _hover={{}}>
                    <Link to="/profile">
                        <MenuItem _hover={{bgColor: "blackAlpha.800"}}>Profile</MenuItem>
                    </Link>
                    <MenuItem _hover={{bgColor: "blackAlpha.800"}}>Sign Out</MenuItem>
                </MenuList>
            </Menu>


            <IoIosArrowBack className="header-back" />
            <IoIosArrowForward className="header-forward" />
            <InputGroup width="50%" marginLeft="8px" size="sm">
                <InputLeftElement pointerEvents="none" children={<BiSearchAlt color="gray.300" />} />
                <Input type="tel" placeholder="Search for artists, song,..." borderRadius="40px" size="sm" />
            </InputGroup>
        </Flex>
    );
}
