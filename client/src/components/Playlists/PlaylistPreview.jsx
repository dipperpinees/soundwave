import { AspectRatio, Box, Flex, Icon, Image, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteOutline, MdModeEditOutline } from 'react-icons/md';

export default function PlaylistPreview({ id, name, songs, onDelete }) {
    const [showPlay, setShowPlay] = useState(false);
    return (
        <Box width="100%">
            <Box
                position="relative"
                _hover={{ cursor: 'pointer' }}
                onMouseEnter={() => setShowPlay(true)}
                onMouseLeave={() => setShowPlay(false)}
            >
                <AspectRatio width="100%" ratio={1}>
                    <Image objectFit="cover" src={songs?.[0].thumbnail} alt="Dan Abramov" borderRadius={16} />
                </AspectRatio>
                {showPlay && (
                    <Icon
                        color="var(--primary-color)"
                        as={AiFillPlayCircle}
                        fontSize={60}
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        borderRadius="50%"
                        // onClick={isPlayThisSong ? togglePlay : addAndPlay}
                    />
                )}
            </Box>
            <Flex direction="column" mt={1}>
                <Flex justify="space-between">
                    <Text fontSize={14} fontWeight={600}>
                        {name}
                    </Text>
                    <Menu>
                        <MenuButton>
                            <Icon as={FiEdit} display="flex" fontSize={20} />
                        </MenuButton>
                        <MenuList minWidth={24} bgColor="blackAlpha.900" border="none" fontSize={12}>
                            <MenuItem _focus={{ color: 'var(--primary-color)' }} _active={{}} padding="2px 8px">
                                <Icon as={MdModeEditOutline} marginRight={1} />
                                Edit
                            </MenuItem>
                            <MenuItem _focus={{ color: 'var(--primary-color)' }} _active={{}} padding="2px 8px" onClick={() => onDelete(id)}>
                                <Icon as={MdDeleteOutline} marginRight={1} />
                                Delete
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
                <Text fontSize={12} fontWeight={600} color="whiteAlpha.700" as="span">
                    Playlist • {songs.length} songs
                </Text>
            </Flex>
        </Box>
    );
}
