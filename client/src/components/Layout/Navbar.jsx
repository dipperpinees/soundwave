import { Flex, Icon } from '@chakra-ui/react';
import { useContext } from 'react';
import { HiHeart, HiHome, HiMusicalNote } from 'react-icons/hi2';
import { MdLibraryMusic } from 'react-icons/md';
import { RiUploadCloud2Fill } from 'react-icons/ri';
import { NavLink, useLocation } from 'react-router-dom';
import { UserContext } from '../../stores';

export default function Navbar() {
    const location = useLocation();
    const user = useContext(UserContext)[0];
    if (location.pathname === '/signin' || location.pathname === '/signup') return null;

    return (
        <Flex
            position="fixed"
            color="gray"
            justifyContent="center"
            alignItems="center"
            direction="column"
            top={0}
            left={0}
            bottom={0}
            width="120px"
            gap={10}
        >
            <NavLink to="/" end style={({ isActive }) => (isActive ? { color: 'white' } : undefined)}>
                <Icon as={HiHome} fontSize={28} />
            </NavLink>

            <Icon as={HiMusicalNote} fontSize={28} />
            <Icon as={HiHeart} fontSize={28} />
            {!!user.id && (
                <NavLink to="/upload" style={({ isActive }) => (isActive ? { color: 'white' } : undefined)}>
                    <Icon as={RiUploadCloud2Fill} fontSize={28} />
                </NavLink>
            )}
            {!!user.id && <NavLink to="/songs-manager" style={({ isActive }) => (isActive ? { color: 'white' } : undefined)}>
                <Icon as={MdLibraryMusic} fontSize={28} />
            </NavLink>}
        </Flex>
    );
}
