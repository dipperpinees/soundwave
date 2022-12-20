import {
    AspectRatio,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Icon,
    Image,
    Text,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs';
import { IoMdRemove } from 'react-icons/io';
import { PlayerContext } from '../../stores';
import { DEFAULT_SONG_THUMBNAIL } from '../../utils/image';

export function NextUp({ isOpen, toggleOpen }) {
    const [{ songList, songPlayed, isPlayed }, setPlayer] = useContext(PlayerContext);

    const togglePlay = () => setPlayer({ type: 'Toggle' });

    const changeSong = (id) => {
        return () => setPlayer({ type: 'ChangeIndexSong', payload: id });
    };

    const removeSong = (id) => {
        return () => {
            setPlayer({ type: 'RemoveFromNextUp', payload: id });
        };
    };

    return (
        <>
            <Drawer isOpen={isOpen} onClose={toggleOpen} placement="right" size={{ base: 'sm', md: 'xs' }}>
                <DrawerOverlay />
                <DrawerContent bgColor="blackAlpha.800" color="white">
                    <DrawerCloseButton />
                    <DrawerHeader>Next up playlist</DrawerHeader>

                    <DrawerBody px={4}>
                        <Flex direction="column" gap={2}>
                            {songList.map(({ thumbnail, title, author, id }, index) => (
                                <Flex
                                    align="center"
                                    gap={2}
                                    key={id}
                                    opacity={songPlayed.id === id ? 1 : 0.6}
                                    _hover={{ opacity: 1 }}
                                >
                                    <Icon
                                        _hover={{ cursor: 'pointer' }}
                                        onClick={songPlayed.id === id ? togglePlay : changeSong(id)}
                                        mr={1}
                                        fontSize={24}
                                        as={songPlayed.id === id && isPlayed ? BsPauseFill : BsFillPlayFill}
                                    />
                                    <AspectRatio width={10} ratio={1} flex="none">
                                        <Image
                                            src={thumbnail || DEFAULT_SONG_THUMBNAIL}
                                            alt={title}
                                            boxSize="100%"
                                            objectFit={'cover'}
                                            borderRadius={2}
                                        />
                                    </AspectRatio>
                                    <Flex direction="column" overflow="hidden">
                                        <Text fontSize="0.75rem" fontWeight={500} className="one-line-title">
                                            {title}
                                        </Text>
                                        <Text fontSize="0.75rem" color="whiteAlpha.600">
                                            {author.name}
                                        </Text>
                                    </Flex>
                                    <Icon
                                        fontSize={20}
                                        as={IoMdRemove}
                                        _hover={{ cursor: 'pointer' }}
                                        ml="auto"
                                        onClick={removeSong(id)}
                                    />
                                </Flex>
                            ))}
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}
