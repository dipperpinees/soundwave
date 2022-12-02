import { AspectRatio, Box, Flex, Icon, Image, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteOutline, MdModeEditOutline } from 'react-icons/md';
import { DEFAULT_PLAYLIST_THUMBNAIL } from '../../utils/image';

export default function PlaylistPreview({ id, name, songs, onDelete, thumbnail }) {
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
                    <Image objectFit="cover" src={thumbnail || DEFAULT_PLAYLIST_THUMBNAIL} alt={name} borderRadius={16} />
                </AspectRatio>
                {showPlay && (
                    <Icon
                        color="var(--primary-color)"
                        as={AiFillPlayCircle}
                        fontSize="3.75rem"
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
                    <Text fontSize="0.875rem" fontWeight={600} className="one-line-title">
                        {name}
                    </Text>
                    <Menu>
                        <MenuButton>
                            <Icon as={FiEdit} display="flex" fontSize="1.5rem" />
                        </MenuButton>
                        <MenuList minWidth={24} border="none" fontSize="0.75rem">
                            <MenuItem padding="2px 8px">
                                <Icon as={MdModeEditOutline} marginRight={1} />
                                Edit
                            </MenuItem>
                            <MenuItem padding="2px 8px" onClick={() => onDelete(id)}>
                                <Icon as={MdDeleteOutline} marginRight={1} />
                                Delete
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
                <Text fontSize="0.75rem" fontWeight={600} color="whiteAlpha.700" as="span">
                    Playlist • {songs.length} songs
                </Text>
            </Flex>
        </Box>
    );
}
