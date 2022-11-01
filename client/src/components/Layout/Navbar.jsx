import { Flex, Icon } from '@chakra-ui/react';
import { HiHeart, HiHome, HiMusicalNote } from 'react-icons/hi2';
import { MdAlbum } from 'react-icons/md';
import { RiUploadCloud2Fill } from 'react-icons/ri';
import { NavLink, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();
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
            <NavLink
                to="" end
                style={({ isActive }) =>
                    isActive ? {color: "white", borderRight: "5px solid white"} : undefined
                }
            >
                <Icon as={HiHome} fontSize={28} />
            </NavLink>
                

            <Icon as={HiMusicalNote} fontSize={28} />
            <Icon as={HiHeart} fontSize={28} />
            <NavLink
                to="upload"
                style={({ isActive }) =>
                    isActive ? {color: "white", borderRight: "5px solid white"} : undefined
                }
            >
                <Icon as={RiUploadCloud2Fill} fontSize={28} />
            </NavLink>
            <Icon as={MdAlbum} fontSize={28} />
        </Flex>
    );
}
