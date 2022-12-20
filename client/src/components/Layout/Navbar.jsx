import { Box, Flex, Icon, Image, useMediaQuery } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { HiHeart, HiHome, HiMusicalNote } from 'react-icons/hi2';
import { MdClose, MdLibraryMusic } from 'react-icons/md';
import { RiSearch2Line, RiUploadCloud2Fill } from 'react-icons/ri';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../../stores';
import { ICON } from '../../utils/image';

function Navbar() {
    const user = useContext(UserContext)[0];
    const [showMobileBar, setShowMobileBar] = useState(false);
    const [isMobile] = useMediaQuery('(max-width: 48em)');

    useEffect(() => {
        setShowMobileBar(!isMobile);
    }, [isMobile]);

    const closeMobileBar = () => {
        setShowMobileBar(false);
    };

    const mobileNavbarAnimation = {
        as: motion.div,
        initial: { marginLeft: '-120px' },
        animate: showMobileBar ? { marginLeft: 0 } : { marginLeft: '-120px' },
        transition: { duration: 1 },
    };

    return (
        <>
            {isMobile && (
                <Icon
                    as={FiMenu}
                    position="fixed"
                    top="calc(var(--header-height) / 2 - 12px)"
                    fontSize="1.5rem"
                    left={6}
                    zIndex={10}
                    color="white"
                    _hover={{ cursor: 'pointer', color: 'var(--primary-color)' }}
                    onClick={() => setShowMobileBar(!showMobileBar)}
                />
            )}
            {isMobile && showMobileBar && (
                <Box
                    position="fixed"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bgColor="blackAlpha.500"
                    zIndex={9}
                    onClick={closeMobileBar}
                ></Box>
            )}
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
                zIndex={10}
                bgColor={{ base: 'blackAlpha.900', md: 'transparent' }}
                {...(isMobile && mobileNavbarAnimation)}
            >
                {!isMobile && (
                    <Flex position="absolute" top={3}>
                        <Link to="/">
                            <Image src={ICON} width={16} />
                        </Link>
                    </Flex>
                )}
                {isMobile && (
                    <Icon
                        as={MdClose}
                        position="absolute"
                        top={8}
                        fontSize="1.75rem"
                        color="white"
                        _hover={{ cursor: 'pointer', color: 'var(--primary-color)' }}
                        onClick={closeMobileBar}
                    />
                )}
                <NavLink
                    to="/"
                    end
                    style={({ isActive }) => (isActive ? { color: 'white' } : undefined)}
                    onClick={closeMobileBar}
                >
                    <Icon as={HiHome} fontSize="1.75rem" />
                </NavLink>
                {isMobile && (
                    <NavLink
                        to="/search"
                        style={({ isActive }) => (isActive ? { color: 'white' } : undefined)}
                        onClick={closeMobileBar}
                    >
                        <Icon as={RiSearch2Line} fontSize="1.75rem" />
                    </NavLink>
                )}
                <Icon as={HiMusicalNote} fontSize="1.75rem" onClick={closeMobileBar} />
                {!!user.id && (
                    <NavLink to="/favorite" style={({ isActive }) => (isActive ? { color: 'white' } : undefined)}>
                        <Icon as={HiHeart} fontSize="1.75rem" onClick={closeMobileBar} />
                    </NavLink>
                )}
                {!!user.id && (
                    <NavLink
                        to="/upload"
                        style={({ isActive }) => (isActive ? { color: 'white' } : undefined)}
                        onClick={closeMobileBar}
                    >
                        <Icon as={RiUploadCloud2Fill} fontSize="1.75rem" />
                    </NavLink>
                )}

                {!!user.id && (
                    <NavLink
                        to="/library"
                        style={({ isActive }) => (isActive ? { color: 'white' } : undefined)}
                        onClick={closeMobileBar}
                    >
                        <Icon as={MdLibraryMusic} fontSize="1.75rem" />
                    </NavLink>
                )}
            </Flex>
        </>
    );
}

export default Navbar;
